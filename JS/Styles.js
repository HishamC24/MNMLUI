(() => {
    const BUSY_ALPHA = "0.25";
    const SOLID_ALPHA = "0.10";
    const HIGH_LUMINANCE_THRESHOLD = 0.94;
    const MEDIA_TAGS = new Set(["IMG", "SVG", "VIDEO", "CANVAS", "PICTURE"]);

    const isDarkMode = (el) => {
        if (el.classList.contains("permDark") || document.body.classList.contains("permDark")) {
            return true;
        }
        if (el.classList.contains("permLight") || document.body.classList.contains("permLight")) {
            return false;
        }
        return Boolean(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
    };

    const isVisible = (el) => {
        if (!el || el.classList.contains("removed") || el.classList.contains("transparent")) {
            return false;
        }
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || parseFloat(style.opacity) === 0) {
            return false;
        }
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
    };

    const pointOverlapsRect = (x, y, rect) =>
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

    const hasTextAtPoint = (container, x, y) => {
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
        const range = document.createRange();
        let node;

        while ((node = walker.nextNode())) {
            if (!node.nodeValue || !node.nodeValue.trim()) continue;
            range.selectNodeContents(node);
            const rects = range.getClientRects();
            for (let i = 0; i < rects.length; i++) {
                if (pointOverlapsRect(x, y, rects[i])) {
                    return true;
                }
            }
        }
        return false;
    };

    const parseRgba = (str) => {
        const match = str && str.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,/\s]+([\d.]+))?\s*\)/i);
        if (!match) return null;
        return {
            r: Number(match[1]),
            g: Number(match[2]),
            b: Number(match[3]),
            a: match[4] !== undefined ? Number(match[4]) : 1
        };
    };

    const getRelativeLuminance = ({ r, g, b }) => {
        const toLinear = (c) => {
            const s = c / 255;
            return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    };

    const getEffectiveBgLuminanceAtPoint = (glassyEl, x, y) => {
        const stack = document.elementsFromPoint(x, y);
        let accR = 0, accG = 0, accB = 0, remainingAlpha = 1;

        for (const hit of stack) {
            if (hit === glassyEl || glassyEl.contains(hit) || hit.closest("nav")) {
                continue;
            }
            const rgba = parseRgba(getComputedStyle(hit).backgroundColor);
            if (rgba && rgba.a > 0) {
                const weight = remainingAlpha * rgba.a;
                accR += rgba.r * weight;
                accG += rgba.g * weight;
                accB += rgba.b * weight;
                remainingAlpha *= (1 - rgba.a);
                if (remainingAlpha <= 0.01) break;
            }
        }

        if (remainingAlpha > 0.01) {
            const fallback = { r: 242, g: 242, b: 242 }; // #F2F2F2 light fallback
            accR += fallback.r * remainingAlpha;
            accG += fallback.g * remainingAlpha;
            accB += fallback.b * remainingAlpha;
        }

        return getRelativeLuminance({ r: accR, g: accG, b: accB });
    };

    const isPointBusyOrHighLum = (glassyEl, x, y) => {
        const stack = document.elementsFromPoint(x, y);

        for (const hit of stack) {
            if (hit === glassyEl || glassyEl.contains(hit) || hit.closest("nav")) {
                continue;
            }
            if (MEDIA_TAGS.has(hit.tagName) || hit.closest("svg, picture")) {
                return true;
            }
            if (hasTextAtPoint(hit, x, y)) {
                return true;
            }
        }

        const lum = getEffectiveBgLuminanceAtPoint(glassyEl, x, y);
        return lum >= HIGH_LUMINANCE_THRESHOLD;
    };

    const getSamplePoints = (rect) => {
        const cols = [0.2, 0.5, 0.8];
        const rows = [0.25, 0.5, 0.75];
        const points = [];

        for (const rx of cols) {
            for (const ry of rows) {
                points.push({
                    x: rect.left + rect.width * rx,
                    y: rect.top + rect.height * ry
                });
            }
        }
        return points;
    };

    const updateGlassyShadows = () => {
        const elements = document.querySelectorAll(".glassy");

        elements.forEach((el) => {
            if (!isVisible(el)) return;

            if (isDarkMode(el)) {
                el.style.setProperty("--glassy-shadow-alpha", BUSY_ALPHA);
                return;
            }

            const rect = el.getBoundingClientRect();
            const points = getSamplePoints(rect);
            const useStrongShadow = points.some(({ x, y }) => isPointBusyOrHighLum(el, x, y));

            el.style.setProperty("--glassy-shadow-alpha", useStrongShadow ? BUSY_ALPHA : SOLID_ALPHA);
        });
    };

    let rafId = null;
    const scheduleUpdate = () => {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(() => {
            rafId = null;
            updateGlassyShadows();
        });
    };

    ["scroll", "resize", "load"].forEach((evt) => {
        window.addEventListener(evt, scheduleUpdate, { passive: true });
    });

    window.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener("change", scheduleUpdate);

    document.addEventListener("click", () => {
        setTimeout(scheduleUpdate, 260);
    });

    const observer = new MutationObserver(scheduleUpdate);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "style", "id"]
    });

    scheduleUpdate();
})();