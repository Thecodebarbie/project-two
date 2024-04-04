
// do a fetch call to the login route to redirect to dashboard
const signUpFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const phoneNumber = document.getElementById('phone').value.trim();
  
    if (firstName && lastName && email && password) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/employees/signup', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password, phoneNumber }),
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
    .querySelector('#form-signup')
    .addEventListener('submit', loginFormHandler);