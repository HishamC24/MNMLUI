document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
    const input = wrapper.querySelector('input[type="range"]');
    const progress = wrapper.querySelector('.slider-progress');

    const updateSlider = () => {
        const min = parseFloat(input.min) || 0;
        const max = parseFloat(input.max) || 100;
        const val = parseFloat(input.value);
        const percentage = ((val - min) / (max - min)) * 100;
        progress.style.setProperty('--progress', `${percentage}%`);
    };

    updateSlider();

    input.addEventListener('input', updateSlider);
});