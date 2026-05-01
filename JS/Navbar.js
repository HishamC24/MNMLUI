console.log("MNMLUI Navbar is working!");

const smallNav = document.querySelector('nav > #small');
const navMedium = document.querySelector('nav > #medium');
const navLarge = document.querySelector('nav > #large');
const allTabs = document.querySelectorAll('#small .tab-bar .tab-item, #medium .tab-bar .tab-item, #large .tab-bar .tab-item');

if (navLarge) navLarge.style.display = 'none';
if (navMedium) navMedium.style.display = '';

const toggleNav = (show, hide) => {
    if (!show || !hide) return;

    const hideBar = hide.querySelector('.tab-bar');
    const showBar = show.querySelector('.tab-bar');

    const startRect = hideBar.getBoundingClientRect();

    showBar.style.transition = 'none';

    show.style.display = show.id === 'medium' ? 'flex' : 'block';
    hide.style.display = 'none';

    const endRect = showBar.getBoundingClientRect();

    const deltaX = startRect.left - endRect.left;
    const deltaY = startRect.top - endRect.top;

    const animation = showBar.animate([
        {
            width: `${startRect.width}px`,
            height: `${startRect.height}px`,
            transform: `translate(${deltaX}px, ${deltaY}px)`,
            borderRadius: '32px',
            overflow: 'hidden'
        },
        {
            width: `${endRect.width}px`,
            height: `${endRect.height}px`,
            transform: `translate(0, 0)`,
            borderRadius: '32px',
            overflow: 'hidden'
        }
    ], {
        duration: 250,
        easing: 'ease-in-out'
    });

    animation.onfinish = () => {
        showBar.style.transition = '';
    };

    Array.from(showBar.children).forEach(child => {
        child.animate([
            { opacity: 0, transform: 'scale(0.95)' },
            { opacity: 1, transform: 'scale(1)' }
        ], {
            duration: 250,
            easing: 'ease-in-out'
        });
    });
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