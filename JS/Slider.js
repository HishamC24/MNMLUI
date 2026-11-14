document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
    const input = wrapper.querySelector('input[type="range"]');
    const progress = wrapper.querySelector('.slider-progress');
    const ticksContainer = wrapper.querySelector('.slider-ticks');

    const updateSlider = () => {
        const min = parseFloat(input.min) || 0;
        const max = parseFloat(input.max) || 100;
        const val = parseFloat(input.value);
        const percentage = ((val - min) / (max - min)) * 100;
        
        progress.style.setProperty('--progress-width', `${percentage}%`);
    };

    const generateTicks = () => {
        if (!ticksContainer) return;
        ticksContainer.innerHTML = '';
        
        const min = parseFloat(input.min) || 0;
        const max = parseFloat(input.max) || 100;
        const step = parseFloat(input.step) || 1;
        const totalSteps = (max - min) / step;

        if (totalSteps > 100 || isNaN(totalSteps)) return;

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
});