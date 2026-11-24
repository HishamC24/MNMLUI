console.log("MNMLUI is working!");

const currentScriptSrc = document.currentScript.src;
const BASE_DIR = currentScriptSrc.substring(0, currentScriptSrc.lastIndexOf('/'));
window.MNMLUI_BASE_DIR = BASE_DIR;

const cssLink = document.createElement('link');
cssLink.rel = 'stylesheet';
cssLink.href = `${BASE_DIR}/CSS/Main.css`;
document.head.appendChild(cssLink);

const mainScript = document.createElement('script');
mainScript.src = `${BASE_DIR}/JS/Main.js`;
mainScript.defer = true;
document.head.appendChild(mainScript);