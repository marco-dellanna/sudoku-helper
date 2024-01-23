const lines = document.querySelector('.lines');

const draw = (c1, c2) => {
    const lines_bcr = lines.getBoundingClientRect();
    const bcr_1 = c1.getBoundingClientRect();
    const bcr_2 = c2.getBoundingClientRect();
   
    let x1 = bcr_1.left + 30 - lines_bcr.left;
    let y1 = bcr_1.top + 30 - lines_bcr.top;

    let x2 = bcr_2.left + 30 - lines_bcr.left;
    let y2 = bcr_2.top + 30 - lines_bcr.top;

    lines.innerHTML += `<circle cx="${x1}" cy="${y1}" r="2" fill="red"/>`;
    lines.innerHTML += `<circle cx="${x2}" cy="${y2}" r="2" fill="red"/>`;
    lines.innerHTML += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="1" stroke="black"/>`;
}

const show_lines = group => {
    lines.style.zIndex = '0';
    for(let i = 0; i < group.length - 1; i++){
        draw(group[i], group[i+1]);
        console.log(group[i], group[i+1]);
    }
};

const hide_lines = () => {
    lines.style.zIndex = '';
    lines.innerHTML = '';
};