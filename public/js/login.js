const loginForm = document.getElementById('form-login')

function loginHandler(event){ // do a fetch call to the login route to redirect to dashboard
    event.preventDefault()
    //location.href='/dashboard'
    console.log("hello!")


    // display loader
    document.getElementById("login-container").style.display = "none"
    document.getElementById("loader").style.display = "block"


    setTimeout(() => {
        location.href='/dashboard'
    }, 2000)
}

loginForm.addEventListener('submit', loginHandler)