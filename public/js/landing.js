const log1 = document.getElementById('log-1')
const log2 = document.getElementById('log-2')

const reg2 = document.getElementById('reg-2')


function redirectToLogin() {
    window.location.href = "/login";
}

// Function to redirect to register page
function redirectToRegister() {
    window.location.href = "/register";
}

// Event listener for Login button
document.getElementById("log-2").addEventListener("click", redirectToLogin);

// Event listener for Register button
document.getElementById("reg-2").addEventListener("click", redirectToRegister);