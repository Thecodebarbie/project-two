const formLogin = document.getElementById('form-login');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const registerBtn = document.getElementById('register-btn')
const loginEmailError = document.getElementById('login-email-error');
const loginPasswordError = document.getElementById('login-password-error');

const signupForm = document.getElementById('form-signup');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupEmailError = document.getElementById('signup-email-error');
const signupPasswordError = document.getElementById('signup-password-error');
const firstNameError = document.getElementById('firstName-error');
const lastNameError = document.getElementById('lastName-error');
const phoneError = document.getElementById('phone-error');



//Function to validate login form
const validateLoginForm = () => {
  let isValid = true;

  if (loginEmail.value.trim() === '') {
    loginEmailError.textContent = 'Email is required';
    isValid = false;
  } else {
    loginEmailError.textContent = '';
  }

  if (loginPassword.value.trim() === '') {
    loginPasswordError.textContent = 'Password is required';
  } else {
    loginPasswordError.textContent = '';
  }

  return isValid
}


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
      // If successful, redirect the browser to the autheticate page
      document.location.replace('/authenticate');
    } else {
      alert(response.statusText);
    }
  }
};

const validateSignupForm = () => {
  let isValid = true;

  if (firstName.value.trim() === '') {
    firstNameError.textContent = 'First Name is required';
    isValid = false;
  } else {
    firstNameError.textContent = '';
  }

  if (lastName.value.trim() === '') {
    lastNameError.textContent = 'Last Name is required';
    isValid = false;
  } else {
    lastNameError.textContent = '';
  }

  if (signupEmail.value.trim() === '') {
    signupEmailError.textContent = 'Email is required';
    isValid = false;
  } else {
    signupEmailError.textContent = '';
  }

  if (signupPassword.value.trim() === '') {
    signupPasswordError.textContent = 'Password is required';
    isValid = false;
  } else {
    signupPasswordError.textContent = '';
  }

  if (phone.value.trim() === '') {
    phoneError.textContent = 'Phone Number is required';
    isValid = false;
  } else {
    phoneError.textContent = '';
  }

  return isValid;
};

// Function to handle signup form submission
const handleSignup = async () => {

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const emailSignup = document.getElementById('signup-email').value.trim();
  const passwordSignup = document.getElementById('signup-password').value.trim();
  const signupPhone = document.getElementById('phone').value.trim();

  if (validateSignupForm()) {
    try {
      const response = await fetch('/api/employees/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ firstName, lastName, signupEmail, password, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Employee registered successfully');
        // Redirect to dashboard after successful signup
        window.location.href = '/dashboard';
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
};

// Add event listener to sign-up 
document
  .getElementById('login-btn')
  .addEventListener('click', loginFormHandler);
  console.log('this btn works!!')

document
  .querySelector('#form-signup')
  .addEventListener('submit', handleSignup);
  console.log("signup works")

//loginForm.addEventListener('submit', loginHandler)
//loginBtn.addEventListener('submit', loginHandler)