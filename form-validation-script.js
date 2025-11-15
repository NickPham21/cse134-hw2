const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const comment = document.getElementById('comment');
const form_errors = document.getElementById('form-errors'); 
const numCharLabel = document.getElementById('char-count');
const form = document.querySelector('form');
const errorName = document.getElementById('error-name');
const errorEmail = document.getElementById('error-email');
const errorPhone = document.getElementById('error-phone');
const errorComment = document.getElementById('error-comment');
const infoCommentCount = document.getElementById('info-comment-count');

let form_errors_arr = [];



form.addEventListener("submit", (event) => {

    
    if (!name.checkValidity()) {
        handleNameError();
        event.preventDefault();
    } 
    if (!email.checkValidity()) {
        handleEmailError();
        event.preventDefault();
    }
    if (!phone.checkValidity()) {
        handlePhoneError();
        event.preventDefault();
    }
    
    console.log('Errors collected:', form_errors_arr);
    form_errors_str = JSON.stringify(form_errors_arr);
    form_errors.value = form_errors_str;
    
});

function showErrorMessage(error, message) {
    error.textContent = message;
    error.className = ''; // Reset first
    void error.offsetWidth; // Force reflow
    error.className = 'error-show';
}

function showWarningMessage(info, message) {
    info.textContent = message;
    info.className = ''; // Reset first
    void info.offsetWidth; // Force reflow
    info.className = 'info-warn';
}

comment.addEventListener('input', () => {
    numChar = comment.value.length;
    limit = comment.maxLength;
    numCharLabel.textContent = `Character count: ${numChar} / ${limit}`;
    if (numChar == limit) {
        comment.className = 'at-character-limit';
        handleCommentError();
    } else if (numChar > limit-10 && numChar < limit) {
        showWarningMessage(infoCommentCount, `Warning: Approaching character limit of ${limit} characters!`);
        comment.className = 'near-char-limit';
    } else {
        comment.className = '';
        errorComment.textContent = '';
        errorComment.className = '';
        infoCommentCount.textContent = '';
    }
});

function handleNameError() {
    if (name.validity.valueMissing) {
        form_errors_arr.push('name: value missing');
        showErrorMessage(errorName, 'Name is required.');
    } else if (name.validity.patternMismatch) {
        form_errors_arr.push('name: pattern mismatch');
        showErrorMessage(errorName, 'Name can only contain letters and spaces.');
    }
}

function handleEmailError() {
    if (email.validity.valueMissing) {
        form_errors_arr.push('email: value missing');
        showErrorMessage(errorEmail, 'Email is required.');
    } else if (email.validity.typeMismatch) {
        form_errors_arr.push('email: type mismatch');
        showErrorMessage(errorEmail, 'Entered value needs to be an email address.');
    } else if (email.validity.patternMismatch) {
        form_errors_arr.push('email: pattern mismatch');
        showErrorMessage(errorEmail, 'Enter a valid email address (e.g., user@example.com).');
    }
}

function handlePhoneError() {
    if (phone.validity.patternMismatch) {
        form_errors_arr.push('phone: pattern mismatch');
        showErrorMessage(errorPhone, 'Enter a valid 10-digit phone number.');
    }
}

function handleCommentError() {
    // Note: form will still submit, this is just for user feedback
    showErrorMessage(errorComment, `Comment cannot exceed ${comment.maxLength} characters.`);
    form_errors_arr.push('comment: character limit reached');
}
