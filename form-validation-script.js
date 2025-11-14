const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const comment = document.getElementById('comment');
const numCharLabel = document.getElementById('char-count');
const form = document.querySelector('form');
const error = document.getElementById('error');

name.addEventListener('input', () => {
    if (name.validity.valid) {
        error.textContent = '';
        error.className = 'error-hide';
    } else {
        showNameError();
    }
});

email.addEventListener('input', () => {
    if (email.validity.valid) {
        error.textContent = '';
        error.className = 'error-hide';
    } else {
        showEmailError();
    }
});

phone.addEventListener('input', () => {
    if (phone.validity.valid) {
        error.textContent = '';
        error.className = 'error-hide';
    } else {
        showPhoneError();
    }
});

comment.addEventListener('input', () => {
    numChar = comment.value.length;
    limit = comment.maxLength;
    numCharLabel.textContent = `Character count: ${numChar} / ${limit}`;
    if (numChar == limit) {
        // User has reached character limit, show the error
        comment.className = 'at-character-limit';
        showCommentError();
    } else if (numChar > limit-10 && numChar < limit) {
        // Warn user they are near the character limit
        comment.className = 'near-char-limit';
    
    } else {
        comment.className = '';
        error.textContent = '';
        error.className = 'error-hide';
    }
});

function showNameError() {
    error.className = 'error-show';
    if (name.validity.valueMissing) {
        error.textContent = 'Name is required.';
    } else if (name.validity.patternMismatch) {
        error.textContent = 'Name can only contain letters and spaces.';
    }
}

function showEmailError() {
    error.className = 'error-show';
    if (email.validity.valueMissing) {
        error.textContent = 'Email is required.';
    } else if (email.validity.typeMismatch) {
        error.textContent = 'Entered value needs to be an email address.';
    } else if (email.validity.patternMismatch) {
        error.textContent = 'Enter a valid email address (e.g., user@example.com).';
    }
}

function showPhoneError() {
    error.className = 'error-show';
    if (phone.validity.patternMismatch) {
        error.textContent = 'Enter a valid 10-digit phone number.';
    }
}

function showCommentError() {
    error.className = 'error-show';
    error.textContent = `Comment cannot exceed ${comment.maxLength} characters.`;
}