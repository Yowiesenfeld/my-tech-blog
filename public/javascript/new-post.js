async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector("#newPostTitle").value;
    const content = document.querySelector("#newPostBody").value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.newPostForm').addEventListener('submit', newFormHandler);