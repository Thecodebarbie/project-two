
// do a fetch call to the login route to redirect to dashboard
const signUpFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const first_name = document.getElementById('firstName').value.trim();
    const last_name = document.getElementById('lastName').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const phone_number = document.getElementById('phone').value.trim();
  
    if (first_name && last_name && email && password) {
      // Send a POST request to the API endpoint
      const manager_id = null
      const randomNumber = generateRandom4DigitNumber();
      console.log("Random Number: "+randomNumber);
      const auth_id = randomNumber
      const response = await fetch('/api/employees/signup', {
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, email, password, phone_number, manager_id, auth_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/authenticate');
      } else {
        alert(response.statusText);
      }
    }
  };

// Generate a random 4-digit number
  const generateRandom4DigitNumber = () => {
    const min = 1000; // Minimum 4-digit number (1000)
    const max = 9999; // Maximum 4-digit number (9999)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
 
  
  document
    .querySelector('#form-signup')
    .addEventListener('submit', signUpFormHandler);