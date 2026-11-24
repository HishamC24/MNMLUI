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

    const pointInRect = (x, y, rect) =>
        rect.width > 0 &&
        rect.height > 0 &&
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom;

    const hasExactContentAtPoint = (hit, x, y) => {
        if (MEDIA_TAGS.has(hit.tagName) || hit.closest("svg, picture")) {
            return true;
        }

        const walker = document.createTreeWalker(hit, NodeFilter.SHOW_TEXT);
        const nodeRange = document.createRange();
        const charRange = document.createRange();
        let node;

        while ((node = walker.nextNode())) {
            const text = node.nodeValue;
            if (!text || !text.trim()) continue;

            nodeRange.selectNodeContents(node);
            const nodeRect = nodeRange.getBoundingClientRect();
            if (!pointInRect(x, y, nodeRect)) continue;

            for (let i = 0; i < text.length; i++) {
                if (/\s/.test(text[i])) continue;
                charRange.setStart(node, i);
                charRange.setEnd(node, i + 1);
                const rects = charRange.getClientRects();
                for (let r = 0; r < rects.length; r++) {
                    if (pointInRect(x, y, rects[r])) {
                        return true;
                    }
                }
            }
        }

        return false;
    };

    const parseColor = (str) => {
        if (!str || str === "transparent") return null;

        const rgbMatch = str.match(
            /^rgba?\(\s*([\d.]+)%?[\s,]+([\d.]+)%?[\s,]+([\d.]+)%?(?:[\s,/]+([\d.]+)%?)?\s*\)$/i
        );
        if (rgbMatch) {
            const scale = (v, isPct) => (isPct ? (Number(v) / 100) * 255 : Number(v));
            const aRaw = rgbMatch[4] !== undefined ? Number(rgbMatch[4]) : 1;
            const alpha = str.includes("%") && rgbMatch[4]?.endsWith("%") ? aRaw / 100 : aRaw;
            return {
                r: scale(rgbMatch[1], rgbMatch[1].endsWith("%")),
                g: scale(rgbMatch[2], rgbMatch[2].endsWith("%")),
                b: scale(rgbMatch[3], rgbMatch[3].endsWith("%")),
                a: alpha
            };
        }

        const srgbMatch = str.match(
            /^color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)$/i
        );
        if (srgbMatch) {
            return {
                r: Number(srgbMatch[1]) * 255,
                g: Number(srgbMatch[2]) * 255,
                b: Number(srgbMatch[3]) * 255,
                a: srgbMatch[4] !== undefined ? Number(srgbMatch[4]) : 1
            };
        }

        return null;
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
            const rgba = parseColor(getComputedStyle(hit).backgroundColor);
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
            if (hasExactContentAtPoint(hit, x, y)) {
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
            { x: left, y: top },
            { x: cx, y: top },
            { x: right, y: top },
            { x: left, y: cy },
            { x: cx, y: cy },
            { x: right, y: cy },
            { x: left, y: bottom },
            { x: cx, y: bottom },
            { x: right, y: bottom }
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