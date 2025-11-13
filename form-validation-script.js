const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const form = document.querySelector('form');
const errorName = document.getElementById('error-name');
const errorEmail = document.getElementById('error-email');
const errorPhone = document.getElementById('error-phone');
const errorComment = document.getElementById('error-comment');

name.addEventListener('input', () => {
    if (name.validity.valid) {
        errorName.textContent = '';
        errorName.className = 'error';
    } else {
        showNameError();
    }
});



function showNameError() {
    if (name.validity.valueMissing) {
        errorName.textContent = 'Name is required.';
    } else if (name.validity.tooShort) {
        errorName.textContent = `Name should be at least ${name.minLength} characters; you entered ${name.value.length}.`;
    } else if (name.validity.patternMismatch) {
        errorName.textContent = 'Name can only contain letters and spaces.';
    }
}