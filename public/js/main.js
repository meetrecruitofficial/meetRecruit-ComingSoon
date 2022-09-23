// post login form using fetch API
const signupForm = document.getElementById('signUp')

signupForm.addEventListener('submit', async function (evt) {
    evt.preventDefault(); // to prevent the custom form property of reloading on submission.

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    // console.log(name)

    await fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name,
            email: email,
        })
    })
        .then(res => res.json())
        .then(data => {
            const message = data.message
            if (message == "OK") {
                swal({
                    icon: "success",
                    text: "Successfully subscribed",
                    button: false,
                })
                setTimeout(() => { location.assign('/'); }, 1700);
                // setTimeout(() => { location.assign('/index'); }, 1000);
            } else if (message == "error") {
                swal({
                    icon: "error",
                    text: "Please try again",
                    button: false,
                })
            }
        })

})
