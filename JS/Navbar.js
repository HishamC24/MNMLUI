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

const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .tab-item.hide-pill#selected::before {
        display: none !important;
    }
`;
document.head.appendChild(styleSheet);

allTabs.forEach(item => {
    item.addEventListener('click', (e) => {
        const clickedLabel = e.currentTarget.querySelector('p')?.innerText.trim();
        const smallTabs = Array.from(document.querySelectorAll('#small .tab-bar .tab-item'));
        const existsInSmall = smallTabs.some(tab => tab.querySelector('p')?.innerText.trim() === clickedLabel);

        ['small', 'medium', 'large'].forEach(navId => {
            const navContainer = document.querySelector(`nav > #${navId}`);
            if (!navContainer) return;
            if (navId === 'small' && !existsInSmall) return;

            const navTabs = Array.from(navContainer.querySelectorAll('.tab-item'));
            const oldTab = navTabs.find(t => t.id === 'selected');
            const newTab = navTabs.find(t => t.querySelector('p')?.innerText.trim() === clickedLabel);

            if (oldTab && newTab && oldTab !== newTab) {
                const tabBar = navContainer.querySelector('.tab-bar');
                const isVisible = tabBar.getBoundingClientRect().width > 0;
                console.log("Tab Bar Width:", tabBar.getBoundingClientRect().width); // REMOVE WHEN DONE
                if (isVisible) {
                    tabBar.style.position = 'relative';

                    let oldHeight = oldTab.offsetHeight;
                    let oldWidth = oldTab.offsetWidth;
                    let oldTop = oldTab.offsetTop;
                    let oldLeft = oldTab.offsetLeft;

                    let newHeight = newTab.offsetHeight;
                    let newWidth = newTab.offsetWidth;
                    let newTop = newTab.offsetTop;
                    let newLeft = newTab.offsetLeft;

                    if (navId === 'small') {
                        oldTop = oldTop + (oldHeight - 56) / 2;
                        oldHeight = 56;
                        newTop = newTop + (newHeight - 56) / 2;
                        newHeight = 56;
                    }

                    const ghost = document.createElement('div');
                    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                    ghost.style.position = 'absolute';
                    ghost.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
                    ghost.style.pointerEvents = 'none';
                    ghost.style.zIndex = '1';

                    tabBar.appendChild(ghost);

                    newTab.classList.add('hide-pill');
                    oldTab.removeAttribute('id');
                    newTab.id = 'selected';

                    const radius = navId === 'large' ? '24px' : '28px';

                    const animation = ghost.animate([
                        { top: `${oldTop}px`, left: `${oldLeft}px`, width: `${oldWidth}px`, height: `${oldHeight}px`, borderRadius: radius },
                        { top: `${newTop}px`, left: `${newLeft}px`, width: `${newWidth}px`, height: `${newHeight}px`, borderRadius: radius }
                    ], {
                        duration: 250,
                        easing: 'ease-in-out'
                    });

                    const idleColor = isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)';

                    [oldTab, ...oldTab.querySelectorAll('svg, p')].forEach(el => {
                        el.animate([
                            { color: idleColor, offset: 0.5 },
                            { color: idleColor }
                        ], { duration: 250, easing: 'ease-in-out' });
                    });

                    [newTab, ...newTab.querySelectorAll('svg, p')].forEach(el => {
                        el.animate([
                            { color: idleColor },
                            { color: idleColor, offset: 0.5 },
                        ], { duration: 250, easing: 'ease-in-out' });
                    });

                    animation.onfinish = () => {
                        ghost.remove();
                        newTab.classList.remove('hide-pill');
                    };
                } else {
                    oldTab.removeAttribute('id');
                    newTab.id = 'selected';
                }
            } else if (!oldTab && newTab) {
                newTab.id = 'selected';
            }
        });

        smallNav?.classList.remove('compact');
    });
});