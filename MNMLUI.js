const BASE_URL = 'https://hishamc24.github.io/MNMLUI';

const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = `${BASE_URL}/CSS/Main.css`; 
document.head.appendChild(cssLink);

const componentScripts = [
    '/JS/Navbar.js',
];

componentScripts.forEach(scriptPath => {
    const script = document.createElement('script');
    script.src = `${BASE_URL}${scriptPath}`;
    script.defer = true; 
    document.head.appendChild(script);
});