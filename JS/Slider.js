document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
    const input = wrapper.querySelector('input[type="range"]');
    const progress = wrapper.querySelector('.slider-progress');
    const ticksContainer = wrapper.querySelector('.slider-ticks');

    if (!input || !progress) return;

    let lastSyncedValue = input.value;

    const updateSlider = () => {
        const min = parseFloat(input.min) || 0;
        const max = parseFloat(input.max) || 100;
        const val = parseFloat(input.value);
        const span = max - min;
        const percentage = span > 0 ? Math.min(100, Math.max(0, ((val - min) / span) * 100)) : 0;

        progress.style.setProperty('--progress-width', `${percentage}%`);
        lastSyncedValue = input.value;
    };

    const generateTicks = () => {
        if (!ticksContainer) return;
        ticksContainer.innerHTML = '';

        const min = parseFloat(input.min) || 0;
        const max = parseFloat(input.max) || 100;
        const step = parseFloat(input.step) || 1;
        const totalSteps = (max - min) / step;

        if (totalSteps > 100 || isNaN(totalSteps) || totalSteps <= 0) return;

        for (let i = 0; i <= totalSteps; i++) {
            const val = min + (i * step);
            const percentage = ((val - min) / (max - min)) * 100;

            const tick = document.createElement('div');
            tick.className = 'slider-tick';
            tick.style.left = `${percentage}%`;
            ticksContainer.appendChild(tick);
        }
    };

    updateSlider();
    generateTicks();

    input.addEventListener('input', updateSlider);
    input.addEventListener('change', updateSlider);

    const valueDescriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value');
    if (valueDescriptor?.set && valueDescriptor?.get) {
        Object.defineProperty(input, 'value', {
            get() {
                return valueDescriptor.get.call(this);
            },
            set(nextVal) {
                valueDescriptor.set.call(this, nextVal);
                updateSlider();
            }
        });
    }

    const attrObserver = new MutationObserver(() => {
        generateTicks();
        updateSlider();
    });
    attrObserver.observe(input, { attributes: true, attributeFilter: ['min', 'max', 'step', 'value'] });

    const section = wrapper.closest('section');
    if (section) {
        const sectionObserver = new MutationObserver(() => {
            if (!section.classList.contains('removed') && input.value !== lastSyncedValue) {
                updateSlider();
            }
        });
        sectionObserver.observe(section, { attributes: true, attributeFilter: ['class'] });
    }

    input.addEventListener('pointerdown', (e) => {
        input.classList.add('is-active');
        if (input.setPointerCapture) {
            input.setPointerCapture(e.pointerId);
        }
    });

    const removeActive = (e) => {
        input.classList.remove('is-active');
        if (input.hasPointerCapture && input.hasPointerCapture(e.pointerId)) {
            input.releasePointerCapture(e.pointerId);
        }
    };

    input.addEventListener('pointerup', removeActive);
    input.addEventListener('pointercancel', removeActive);
});
