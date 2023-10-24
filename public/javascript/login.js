async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#login-email-input').value.trim();
    const password = document.querySelector('#login-password-input').value.trim();

    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // redirect to dashboard when logged in, instead of '/'
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }

  async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#signup-username-input').value.trim();
    const email = document.querySelector('#signup-email-input').value.trim();
    const password = document.querySelector('#signup-password-input').value.trim();

    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }

  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);