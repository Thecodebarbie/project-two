// Select all OTP input fields
const otpInputs = document.querySelectorAll('.otp-input');

// Function to handle OTP input
const handleOtpInput = (e) => {
    const input = e.target;

    // If the input value length is 1
    if (input.value.length === 1) {
        const nextInput = input.nextElementSibling;
        
        // Focus on the next input field
        if (nextInput) {
            nextInput.focus();
        } else {
            input.blur(); // Remove focus from the last input
        }
    } 
    // If the input value length is 0
    else if (input.value.length === 0) {
        const prevInput = input.previousElementSibling;
        
        // Focus on the previous input field
        if (prevInput) {
            prevInput.focus();
        }
    }
};

// Add event listeners to all OTP input fields
otpInputs.forEach(input => {
    input.addEventListener('input', handleOtpInput);
});



// Function to handle form submission
const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission

    // Combine OTP inputs into a single string
    const auth_id = Array.from(otpInputs).map(input => input.value).join('');

    // Send a POST request to the API endpoint
    const response = await fetch('/api/authenticate', {
        method: 'POST',
        body: JSON.stringify({ auth_id }),
        //body: auth_id,
        headers: { 'Content-Type': 'application/json' },
        //headers: { 'Content-Type': 'text/plain'}
    });

    if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

// Select the OTP form
const form = document.getElementById('otp');
// Event listener for the form submission
form.addEventListener('submit', handleFormSubmit);
console.log('Submission is working!')

// Select the exit button
const exitBtn = document.getElementById('exit-btn');

// Event listener for the exit button click
exitBtn.addEventListener('click', () => {
    console.log('Exit button clicked');
    // Exit logic
});

// Select the resend button
const resendBtn = document.querySelector('.resendBtn');

// Event listener for the resend button click
resendBtn.addEventListener('click', () => {
    console.log('Resending OTP...');
    // Resend logic
});

// Select the verify button
const verifyBtn = document.getElementById('verify-btn');
console.log('Verify button clicked')

verifyBtn.addEventListener('click', handleFormSubmit)
// // Event listener for the verify button click
// verifyBtn.addEventListener('click', () => {
//     console.log('Verify button clicked');  // Added console.log here
//     handleFormSubmit();
// });


































// const twoFactorHandler = async (event) => {
//     event.preventDefault();
  
//     // Collect values from the login form
//     const inputOne = document.getElementById('otp-input1').value.trim();
//     const inputTwo = document.getElementById('otp-input2').value.trim();
//     const inputThree = document.getElementById('otp-input3').value.trim();
//     const inputFour = document.getElementById('otp-input4').value.trim();
    
//     const authenticationId = inputOne + inputTwo + inputThree + inputFour
//     console.log(authenticationId)

   
//       // Send a POST request to the API endpoint
//       // const response = await fetch('/api/authenticate', {
//       //   method: 'POST',
//       //   body: JSON.stringify({ authenticationId }),
//       //   headers: { 'Content-Type': 'application/json' },
//       // });
  
//       // if (response.ok) {
//       //   // If successful, redirect the browser to the profile page
//       //   document.location.replace('/dashboard');
//       // } else {
//       //   alert(response.statusText);
//       // }

//       alert("this function has been called")
//   };

//   const handleVerifyBtn = async (event) => {
//     event.preventDefault();
  
    
//     const verifyBtn = document.getElementById('verify-btn')
//     const exitBtn = document.getElementById('exit-btn')
//     const authenticationId = 1245
//       // Send a POST request to the API endpoint
//       const response = await fetch('/api/authenticate', {
//         method: 'POST',
//         body: JSON.stringify({ authenticationId }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (response.ok) {
//         // If successful, redirect the browser to the profile page
//         document.location.replace('/dashboard');
//       } else {
//         alert(response.statusText);
//       }
//   };

//   document
//   .querySelector('#verify-btn')
//   .addEventListener('submit', twoFactorHandler);
  
//   document
//   .querySelector('.opt-form')
//   .addEventListener('submit', handleVerifyBtn);