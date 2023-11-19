let current_color = null;

const btn_colors = document.querySelectorAll('.color_picker div');
btn_colors.forEach((box, index) => box.addEventListener('click', (ev) => {
    if(current_color) current_color.classList.remove('selected');
    current_color = ev.target;
    current_color.classList.add('selected');
}));