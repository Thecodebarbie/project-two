

// do a fetch call to the login route to redirect to dashboard
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();
  
    if (email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/employees/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/authentication');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('#form-login')
    .addEventListener('submit', loginFormHandler);

//loginForm.addEventListener('submit', loginHandler)
//loginBtn.addEventListener('submit', loginHandler)