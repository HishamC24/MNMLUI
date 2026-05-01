console.log("MNMLUI Navbar is working!");

const smallNav = document.querySelector('nav > #small');
const navMedium = document.querySelector('nav > #medium');
const navLarge = document.querySelector('nav > #large');
const allTabs = document.querySelectorAll('#small .tab-bar .tab-item, #medium .tab-bar .tab-item, #large .tab-bar .tab-item');

if (navLarge) navLarge.style.display = 'none';
if (navMedium) navMedium.style.display = '';

const toggleNav = (show, hide) => {
    const updateDOM = () => {
        if (show) show.style.display = show.id === 'medium' ? 'flex' : 'block';
        if (hide) hide.style.display = 'none';
    };

    if (document.startViewTransition) {
        document.startViewTransition(updateDOM);
    } else {
        updateDOM();
    }
};

navMedium?.querySelector('#nav-toggle')?.addEventListener('click', () => toggleNav(navLarge, navMedium));
navLarge?.querySelector('#nav-toggle')?.addEventListener('click', () => toggleNav(navMedium, navLarge));

let lastScrollY = window.scrollY || window.pageYOffset;

const getDocHeight = () => {
    const { body: b, documentElement: e } = document;
    return Math.max(b.scrollHeight, e.scrollHeight, b.offsetHeight, e.offsetHeight, b.clientHeight, e.clientHeight);
};

const handleCompactNav = () => {
    if (!smallNav) return;

    const y = window.scrollY || window.pageYOffset;
    const h = window.innerHeight || document.documentElement.clientHeight;
    const atBottom = y >= Math.max(0, getDocHeight() - h) - 8;

    if (atBottom || y < lastScrollY - 4) {
        smallNav.classList.remove('compact');
    } else if (y > lastScrollY + 4) {
        smallNav.classList.add('compact');
    }

    lastScrollY = y;
};

['scroll', 'resize'].forEach(e => window.addEventListener(e, handleCompactNav, { passive: true }));
window.addEventListener('load', handleCompactNav);

allTabs.forEach(item => {
    item.addEventListener('click', (e) => {
        const clickedLabel = e.currentTarget.querySelector('p')?.innerText.trim();
        const smallTabs = Array.from(document.querySelectorAll('#small .tab-bar .tab-item'));
        const existsInSmall = smallTabs.some(tab => tab.querySelector('p')?.innerText.trim() === clickedLabel);
        allTabs.forEach(tab => {
            const isSmallTab = tab.closest('#small') !== null;
            if (isSmallTab && !existsInSmall) {
                return;
            }
            if (tab.id === 'selected') tab.removeAttribute('id');
            if (tab.querySelector('p')?.innerText.trim() === clickedLabel) {
                tab.id = 'selected';
            }
        });
        smallNav?.classList.remove('compact');
    });
});