const navBottom = document.getElementById('last-link');
const checkbox = document.getElementById('nav-toggle');
checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        console.log('checked');
        navBottom.scrollIntoView({ behavior: 'smooth', block: 'end' });
    } else {
        console.log('unchecked');
    }
});