const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Get all posts for homepage
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                { model: Comment, attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'], include: { model: User, attributes: ['username'] } },
                { model: User, attributes: ['username'] }
            ]
        });

        const posts = dbPostData.map(post => post.get({ plain: true }));

        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get single post
router.get('/post/:id', async (req, res) => {
    try {
        const dbPostData = await Post.findOne({
            where: { id: req.params.id },
            attributes: ['id', 'title', 'content', 'created_at'],
            order: [['created_at', 'DESC']],
            include: [
                { model: Comment, attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'], include: { model: User, attributes: ['username'] } },
                { model: User, attributes: ['username'] }
            ]
        });

        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = dbPostData.get({ plain: true });

        res.render('single-post', { post, loggedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;
