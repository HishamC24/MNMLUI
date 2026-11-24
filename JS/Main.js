const mainScriptSrc = document.currentScript?.src;
const baseDir =
    window.MNMLUI_BASE_DIR ||
    (mainScriptSrc ? mainScriptSrc.substring(0, mainScriptSrc.lastIndexOf('/JS')) : '');

const componentScripts = [
    '/JS/Styles.js',
    '/JS/Navbar.js',
    '/JS/Slider.js',
];

componentScripts.forEach((scriptPath) => {
    const script = document.createElement('script');
    script.src = `${baseDir}${scriptPath}`;
    script.defer = true;
    document.head.appendChild(script);
});