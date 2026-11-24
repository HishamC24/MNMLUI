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

    const pointInRect = (x, y, rect, pad = 0) =>
        rect.width > 0 &&
        rect.height > 0 &&
        x >= rect.left - pad &&
        x <= rect.right + pad &&
        y >= rect.top - pad &&
        y <= rect.bottom + pad;

    const hasCharacterAtPoint = (hit, x, y) => {
        if (MEDIA_TAGS.has(hit.tagName) || hit.closest("svg, picture")) {
            return true;
        }

        let textNode = null;
        let offset = 0;

        if (typeof document.caretPositionFromPoint === "function") {
            const pos = document.caretPositionFromPoint(x, y);
            if (pos && pos.offsetNode && pos.offsetNode.nodeType === Node.TEXT_NODE) {
                textNode = pos.offsetNode;
                offset = pos.offset;
            }
        } else if (typeof document.caretRangeFromPoint === "function") {
            const range = document.caretRangeFromPoint(x, y);
            if (range && range.startContainer && range.startContainer.nodeType === Node.TEXT_NODE) {
                textNode = range.startContainer;
                offset = range.startOffset;
            }
        }

        if (!textNode || !textNode.nodeValue) return false;

        const len = textNode.nodeValue.length;
        const indices = [offset, offset - 1].filter((i) => i >= 0 && i < len);
        const charRange = document.createRange();

        for (const idx of indices) {
            const ch = textNode.nodeValue[idx];
            if (!ch || /\s/.test(ch)) continue;
            charRange.setStart(textNode, idx);
            charRange.setEnd(textNode, idx + 1);
            const rects = charRange.getClientRects();
            for (let i = 0; i < rects.length; i++) {
                if (pointInRect(x, y, rects[i], 2)) {
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

    const getEffectiveBgLuminanceAtPoint = (glassyEl, x, y, stack) => {
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
            if (hasCharacterAtPoint(hit, x, y)) {
                return true;
            }
        }

        const lum = getEffectiveBgLuminanceAtPoint(glassyEl, x, y, stack);
        return lum >= HIGH_LUMINANCE_THRESHOLD;
    };

    // 9 points: 4 corners, 4 edge midpoints, and 1 center
    const getNinePoints = (rect) => {
        const insetX = rect.width > 2 ? 1 : 0;
        const insetY = rect.height > 2 ? 1 : 0;

        const left = rect.left + insetX;
        const right = rect.right - insetX;
        const top = rect.top + insetY;
        const bottom = rect.bottom - insetY;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        return [
            { x: left, y: top },      // top-left
            { x: cx, y: top },        // top-edge center
            { x: right, y: top },     // top-right
            { x: left, y: cy },       // left-edge center
            { x: cx, y: cy },        // center
            { x: right, y: cy },      // right-edge center
            { x: left, y: bottom },   // bottom-left
            { x: cx, y: bottom },     // bottom-edge center
            { x: right, y: bottom }   // bottom-right
        ];
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
            const points = getNinePoints(rect);
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

    window.visualViewport?.addEventListener("resize", scheduleUpdate, { passive: true });
    window.visualViewport?.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener("change", scheduleUpdate);

    if (typeof ResizeObserver !== "undefined") {
        const resizeObserver = new ResizeObserver(scheduleUpdate);
        resizeObserver.observe(document.documentElement);
        document.querySelectorAll("nav, .glassy").forEach((el) => resizeObserver.observe(el));
    }

    document.addEventListener("click", () => {
        requestAnimationFrame(() => requestAnimationFrame(scheduleUpdate));
    });

    ["transitionend", "animationend"].forEach((evt) => {
        document.addEventListener(evt, scheduleUpdate, { passive: true });
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