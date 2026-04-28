console.log("MNMLUI Navbar is working!");

const smallNav = document.querySelector('nav > #small');
const navMedium = document.querySelector('nav > #medium');
const navLarge = document.querySelector('nav > #large');
const allTabs = document.querySelectorAll('#small .tab-bar .tab-item, #medium .tab-bar .tab-item');

if (navLarge) navLarge.style.display = 'none';
if (navMedium) navMedium.style.display = '';

const toggleNav = (show, hide) => {
    if (show) show.style.display = '';
    if (hide) hide.style.display = 'none';
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

        allTabs.forEach(tab => {
            if (tab.id === 'selected') tab.removeAttribute('id');
            if (tab.querySelector('p')?.innerText.trim() === clickedLabel) tab.id = 'selected';
        });

        smallNav?.classList.remove('compact');
    });
});