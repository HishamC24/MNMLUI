console.log("MNMLUI is working!");

const currentScriptSrc = document.currentScript.src;
const BASE_DIR = currentScriptSrc.substring(0, currentScriptSrc.lastIndexOf('/'));

const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = `${BASE_DIR}/CSS/Main.css`;
document.head.appendChild(cssLink);

const componentScripts = [
    '/JS/Navbar.js',
];

componentScripts.forEach(scriptPath => {
    const script = document.createElement('script');
    script.src = `${BASE_DIR}${scriptPath}`;
    script.defer = true;
    document.head.appendChild(script);
});