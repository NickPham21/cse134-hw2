const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const comment = document.getElementById('comment');
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

comment.addEventListener('input', () => {
    numChar = comment.value.length;
    limit = comment.maxLength;
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
    } else if (name.validity.tooShort) {
        errorName.textContent = `Name should be at least ${name.minLength} characters; you entered ${name.value.length}.`;
    } else if (name.validity.patternMismatch) {
        errorName.textContent = 'Name can only contain letters and spaces.';
    }
}

function showCommentError() {
    errorComment.className = 'error-show';
    errorComment.textContent = `Comment cannot exceed ${comment.maxLength} characters.`;
}