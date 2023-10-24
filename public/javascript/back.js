async function backBtnHandler(event) {
                         event.preventDefault();
                         document.location.replace('/dashboard');
                     }
                     
                     document.querySelector('#back-btn').addEventListener('click', backBtnHandler);