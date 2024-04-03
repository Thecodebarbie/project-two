const log1 = document.getElementById('log-1')
//const log2 = document.getElementById('log-2')

function goToLogin() { //redirect to login
    location.href = '/login'
}

log1.addEventListener('click', goToLogin)
//log2.addEventListener('click', goToLogin)