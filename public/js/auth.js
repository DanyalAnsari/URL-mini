document.addEventListener('DOMContentLoaded', function() {
  // Determine which form is active
  const isSignupForm = document.getElementById('register-form') !== null;
  const isSigninForm = document.getElementById('login-form') !== null;
  
  // Validation Regex
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
  const usernameRegex = /^[0-9A-Za-z]{3,16}$/;
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  
  // Function to show validation errors
  const showValidationError = (inputElement, message) => {
    inputElement.classList.add('is-invalid');
    inputElement.classList.remove('is-valid');
    
    // Find the feedback container (sibling of input-wrapper)
    const feedbackContainer = inputElement.closest('.form-label-group').querySelector('.feedback-container');
    
    // Clear previous feedback
    feedbackContainer.innerHTML = '';
    
    // Add new feedback
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('invalid-feedback');
    errorDiv.textContent = message;
    feedbackContainer.appendChild(errorDiv);
  };
  
  // Function to show valid feedback
  const showValid = (inputElement) => {
    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
    
    // Clear feedback
    const feedbackContainer = inputElement.closest('.form-label-group').querySelector('.feedback-container');
    feedbackContainer.innerHTML = '';
  };
  
  // Validation function for inputs
  const validateInput = (inputElement, regex, errorMessage) => {
    if (!regex.test(inputElement.value)) {
      showValidationError(inputElement, errorMessage);
      return false;
    } else {
      showValid(inputElement);
      return true;
    }
  };
  
  // Setup validation for signup form
  if (isSignupForm) {
    const Username = document.getElementById('Username');
    const Email = document.getElementById('Email');
    const Password = document.getElementById('Password');
    
    // Real-time validation
    Username.addEventListener('input', () => 
      validateInput(Username, usernameRegex, 'Username must be 3-16 alphanumeric characters.')
    );
    
    Email.addEventListener('input', () => 
      validateInput(Email, emailRegex, 'Please enter a valid email address.')
    );
    
    Password.addEventListener('input', () => 
      validateInput(Password, passwordRegex, 'Password must be 8-20 characters, include a digit, upper and lowercase letters, and a special character.')
    );
    
    // Submit event handler
    document.getElementById('register-form').addEventListener('submit', (e) => {
      const isUsernameValid = validateInput(Username, usernameRegex, 'Username must be 3-16 alphanumeric characters.');
      const isEmailValid = validateInput(Email, emailRegex, 'Please enter a valid email address.');
      const isPasswordValid = validateInput(Password, passwordRegex, 'Password must be 8-20 characters, include a digit, upper and lowercase letters, and a special character.');
      
      if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
        e.preventDefault(); // Prevent form submission if any validation fails
      }
    });
  }
  
  // Setup validation for signin form
  if (isSigninForm) {
    const Email = document.getElementById('Email');
    const Password = document.getElementById('Password');
    
    // Real-time validation
    Email.addEventListener('input', () => 
      validateInput(Email, emailRegex, 'Please enter a valid email address.')
    );
    
    Password.addEventListener('input', () => 
      validateInput(Password, passwordRegex, 'Please enter a valid password.')
    );
    
    // Submit event handler
    document.getElementById('login-form').addEventListener('submit', (e) => {
      const isEmailValid = validateInput(Email, emailRegex, 'Please enter a valid email address.');
      const isPasswordValid = validateInput(Password, passwordRegex, 'Please enter a valid password.');
      
      if (!isEmailValid || !isPasswordValid) {
        e.preventDefault(); // Prevent form submission if any validation fails
      }
    });
  }
});