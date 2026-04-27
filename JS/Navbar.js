console.log("MNMLUI Navbar is working!");

const smallNav = document.querySelector('#small');
const allTabs = document.querySelectorAll('#small .tab-bar .tab-item, #large .tab-bar .tab-item');

let lastScrollY = window.scrollY || window.pageYOffset;

function getDocHeight() {
    const b = document.body, e = document.documentElement;
    return Math.max(b.scrollHeight, e.scrollHeight, b.offsetHeight, e.offsetHeight, b.clientHeight, e.clientHeight);
}

function handleCompactNav() {
    if (!smallNav) return;

    const y = window.scrollY || window.pageYOffset;
    const h = window.innerHeight || document.documentElement.clientHeight;

    const MAX_SCROLL_Y = Math.max(0, getDocHeight() - h);
    const atBottom = (y >= MAX_SCROLL_Y - 8);

    if (atBottom || y < lastScrollY - 4) {
        smallNav.classList.remove('compact');
    } else if (y > lastScrollY + 4) {
        smallNav.classList.add('compact');
    }

    lastScrollY = y;
}

window.addEventListener('scroll', handleCompactNav, { passive: true });
window.addEventListener('resize', handleCompactNav, { passive: true });
window.addEventListener('load', handleCompactNav);

allTabs.forEach(item => {
    item.addEventListener('click', function () {
        const clickedLabel = this.querySelector('p')?.innerText.trim();

        allTabs.forEach(tab => {
            if (tab.id === 'selected') {
                tab.removeAttribute('id');
            }

            const tabLabel = tab.querySelector('p')?.innerText.trim();
            if (tabLabel === clickedLabel) {
                tab.id = 'selected';
            }
        });

        smallNav?.classList.remove('compact');
    });
});