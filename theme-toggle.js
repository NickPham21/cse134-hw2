const root = document.querySelector(':root');
const themeToggleBtn = document.getElementById('theme-toggle');

// get inverted value from local storage
let isInverted = localStorage.getItem('isInverted') === 'true';

// Apply the saved theme on page load
if (isInverted) {
    setInvertedTheme();
} else {
    setDefaultTheme();
}

themeToggleBtn.addEventListener('click', invertTheme);

/* Default (not inverted) theme colors assigned for reference 
    --main-bg-color: light-dark(#f7f2eb, #080d14);
    --home-graphic-color: light-dark(#0f3b67, #b17436);
    --main-text-color: light-dark(#161616, #f0f0f0);
    --main-border-color: light-dark(#204a8c, #bc842a);
    --main-header-color: light-dark(#f7f2eb, #080d14);
    --link-highlight-color: light-dark(#7e1fea, #cce221);
    --button-bg-color: light-dark(#437bd5, #dfb573);
    --project-card-title-bg-color: light-dark(#f3f3f3, #121a22);
    --project-card-desc-bg-color: light-dark(#f3f3f3, #121a22);
    --project-card-border-color: light-dark(#204a8c, #bc842a);
    --project-card-link-bg-color: light-dark(#437bd5, #bc842a);
    --project-card-link-highlight-color: light-dark(#7e1fea, #cce221);
*/
// Function to invert the theme colors
function invertTheme() {
    if (!isInverted) {
        setInvertedTheme();
        isInverted = true;
        localStorage.setItem('isInverted', 'true');
    } else {
        setDefaultTheme();
        isInverted = false;
        localStorage.setItem('isInverted', 'false');
    }
}

function setDefaultTheme() {
    root.style.setProperty('--main-bg-color', 'light-dark(#f7f2eb, #080d14)');
    root.style.setProperty('--home-graphic-color', 'light-dark(#0f3b67, #b17436)');
    root.style.setProperty('--main-text-color', 'light-dark(#161616, #f0f0f0)');
    root.style.setProperty('--main-border-color', 'light-dark(#204a8c, #bc842a)');
    root.style.setProperty('--main-header-color', 'light-dark(#f7f2eb, #080d14)');
    root.style.setProperty('--link-highlight-color', 'light-dark(#7e1fea, #cce221)');
    root.style.setProperty('--button-bg-color', 'light-dark(#437bd5, #dfb573)');
    root.style.setProperty('--project-card-title-bg-color', 'light-dark(#f3f3f3, #121a22)');
    root.style.setProperty('--project-card-desc-bg-color', 'light-dark(#f3f3f3, #121a22)');
    root.style.setProperty('--project-card-border-color', 'light-dark(#204a8c, #bc842a)');
    root.style.setProperty('--project-card-link-bg-color', 'light-dark(#437bd5, #bc842a)');
    root.style.setProperty('--project-card-link-highlight-color', 'light-dark(#7e1fea, #cce221)');
}

function setInvertedTheme() {
    root.style.setProperty('--main-bg-color', 'light-dark(#080d14, #f7f2eb)');
    root.style.setProperty('--home-graphic-color', 'light-dark(#b17436, #0f3b67)');
    root.style.setProperty('--main-text-color', 'light-dark(#f0f0f0, #161616)');
    root.style.setProperty('--main-border-color', 'light-dark(#bc842a, #204a8c)');
    root.style.setProperty('--main-header-color', 'light-dark(#080d14, #f7f2eb)');
    root.style.setProperty('--link-highlight-color', 'light-dark(#cce221, #7e1fea)');
    root.style.setProperty('--button-bg-color', 'light-dark(#dfb573, #437bd5)');
    root.style.setProperty('--project-card-title-bg-color', 'light-dark(#121a22, #f3f3f3)');
    root.style.setProperty('--project-card-desc-bg-color', 'light-dark(#121a22, #f3f3f3)');
    root.style.setProperty('--project-card-border-color', 'light-dark(#bc842a, #204a8c)');
    root.style.setProperty('--project-card-link-bg-color', 'light-dark(#bc842a, #437bd5)');
    root.style.setProperty('--project-card-link-highlight-color', 'light-dark(#cce221, #7e1fea)');

}