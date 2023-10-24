async function newEntryHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#editTitle').value;
    const content = document.querySelector('#editPostBody').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content,
            id
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

document.querySelector('.editForm').addEventListener('submit', newEntryHandler);