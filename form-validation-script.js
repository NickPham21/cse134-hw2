const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const comment = document.getElementById('comment');
const numCharLabel = document.getElementById('char-count');
const form = document.querySelector('form');
const errorName = document.getElementById('error-name');
const errorEmail = document.getElementById('error-email');
const errorPhone = document.getElementById('error-phone');
const errorComment = document.getElementById('error-comment');

name.addEventListener('input', () => {
    if (name.validity.valid) {
        errorName.textContent = '';
        errorName.className = 'error-hide';
    } else {
        showNameError();
    }
});

email.addEventListener('input', () => {
    if (email.validity.valid) {
        errorEmail.textContent = '';
        errorEmail.className = 'error-hide';
    } else {
        showEmailError();
    }
});

phone.addEventListener('input', () => {
    if (phone.validity.valid) {
        errorPhone.textContent = '';
        errorPhone.className = 'error-hide';
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
        errorComment.textContent = '';
        errorComment.className = 'error-hide';
    }
});

function showNameError() {
    errorName.className = 'error-show';
    if (name.validity.valueMissing) {
        errorName.textContent = 'Name is required.';
    } else if (name.validity.patternMismatch) {
        errorName.textContent = 'Name can only contain letters and spaces.';
    }
}

function showEmailError() {
    errorEmail.className = 'error-show';
    if (email.validity.valueMissing) {
        errorEmail.textContent = 'Email is required.';
    } else if (email.validity.typeMismatch) {
        errorEmail.textContent = 'Entered value needs to be an email address.';
    } else if (email.validity.patternMismatch) {
        errorEmail.textContent = 'Enter a valid email address (e.g., user@example.com).';
    }
}

function showPhoneError() {
    errorPhone.className = 'error-show';
    if (phone.validity.patternMismatch) {
        errorPhone.textContent = 'Enter a valid 10-digit phone number.';
    }
}

function showCommentError() {
    errorComment.className = 'error-show';
    errorComment.textContent = `Comment cannot exceed ${comment.maxLength} characters.`;
}