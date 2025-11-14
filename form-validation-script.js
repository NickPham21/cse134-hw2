const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const comment = document.getElementById('comment');
const form_errors = document.getElementById('form-errors'); 
const numCharLabel = document.getElementById('char-count');
const form = document.querySelector('form');
const error = document.getElementById('error');

let form_errors_arr = [];

form.addEventListener('submit', (event) => {
    form_errors_str = JSON.stringify(form_errors_arr);
    form_errors.value = form_errors_str;
});

name.addEventListener('input', () => {
    if (name.validity.valid) {
        error.textContent = '';
        error.className = 'error-hide';
    } else {
        handleNameError();
    }
});

email.addEventListener('input', () => {
    if (email.validity.valid) {
        error.textContent = '';
        error.className = 'error-hide';
    } else {
        handleEmailError();
    }
});

phone.addEventListener('input', () => {
    if (phone.validity.valid) {
        error.textContent = '';
        error.className = 'error-hide';
    } else {
        handlePhoneError();
    }
});

comment.addEventListener('input', () => {
    numChar = comment.value.length;
    limit = comment.maxLength;
    numCharLabel.textContent = `Character count: ${numChar} / ${limit}`;
    if (numChar == limit) {
        // User has reached character limit, show the error
        comment.className = 'at-character-limit';
        handleCommentError();
    } else if (numChar > limit-10 && numChar < limit) {
        // Warn user they are near the character limit
        comment.className = 'near-char-limit';
    
    } else {
        comment.className = '';
        error.textContent = '';
        error.className = 'error-hide';
    }
});

function handleNameError() {
    error.className = 'error-show';
    if (name.validity.valueMissing) {
        form_errors_arr.push('name: value missing');
        error.textContent = 'Name is required.';
    } else if (name.validity.patternMismatch) {
        form_errors_arr.push('name: pattern mismatch');
        error.textContent = 'Name can only contain letters and spaces.';
    }
}

function handleEmailError() {
    error.className = 'error-show';
    if (email.validity.valueMissing) {
        form_errors_arr.push('email: value missing');
        error.textContent = 'Email is required.';
    } else if (email.validity.typeMismatch) {
        form_errors_arr.push('email: type mismatch');
        error.textContent = 'Entered value needs to be an email address.';
    } else if (email.validity.patternMismatch) {
        form_errors_arr.push('email: pattern mismatch');
        error.textContent = 'Enter a valid email address (e.g., user@example.com).';
    }
}

function handlePhoneError() {
    error.className = 'error-show';
    if (phone.validity.patternMismatch) {
        form_errors_arr.push('phone: pattern mismatch');
        error.textContent = 'Enter a valid 10-digit phone number.';
    }
}

function handleCommentError() {
    error.className = 'error-show';
    form_errors_arr.push('comment: character limit exceeded');
    error.textContent = `Comment cannot exceed ${comment.maxLength} characters.`;
}