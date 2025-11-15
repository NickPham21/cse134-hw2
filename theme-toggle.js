const root = document.querySelector(':root');
const themeToggleBtn = document.getElementById('theme-toggle');
let isInverted = false;

themeToggleBtn.addEventListener('click', invertTheme);

/* Default (not inverted) theme colors assigned for reference 
    --main-bg-color: light-dark(#f7f2eb, #080d14);
    --home-graphic-color: light-dark(#0f3b67, #f0c498);
    --main-text-color: light-dark(#161616, #f0f0f0);
    --main-border-color: light-dark(#204a8c, #dfb573);
    --main-header-color: light-dark(#f7f2eb, #080d14);
    --link-highlight-color: light-dark(#7e1fea, #cce221);
    --button-bg-color: light-dark(#437bd5, #bc842a);
*/
// Function to invert the theme colors
function invertTheme() {
    if (!isInverted) {
        root.style.setProperty('--main-bg-color', 'light-dark(#080d14, #f7f2eb)');
        root.style.setProperty('--home-graphic-color', 'light-dark(#f0c498, #0f3b67)');
        root.style.setProperty('--main-text-color', 'light-dark(#f0f0f0, #161616)');
        root.style.setProperty('--main-border-color', 'light-dark(#dfb573, #204a8c)');
        root.style.setProperty('--main-header-color', 'light-dark(#080d14, #f7f2eb)');
        root.style.setProperty('--link-highlight-color', 'light-dark(#cce221, #7e1fea)');
        root.style.setProperty('--button-bg-color', 'light-dark(#bc842a, #437bd5)');
        isInverted = true;
    } else {
        root.style.setProperty('--main-bg-color', 'light-dark(#f7f2eb, #080d14)');
        root.style.setProperty('--home-graphic-color', 'light-dark(#0f3b67, #f0c498)');
        root.style.setProperty('--main-text-color', 'light-dark(#161616, #f0f0f0)');
        root.style.setProperty('--main-border-color', 'light-dark(#204a8c, #dfb573)');
        root.style.setProperty('--main-header-color', 'light-dark(#f7f2eb, #080d14)');
        root.style.setProperty('--link-highlight-color', 'light-dark(#7e1fea, #cce221)');
        root.style.setProperty('--button-bg-color', 'light-dark(#437bd5, #bc842a)');
        isInverted = false;
    }
}