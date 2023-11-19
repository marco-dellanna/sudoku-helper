const lines = document.querySelector('.lines');
const lines_bcr = lines.getBoundingClientRect();

const draw = (c1, c2) => {
    const box_1 = c1.getAttribute('box');
    const box_2 = c2.getAttribute('box');

    let x1, y1, x2, y2;
    if (Math.floor(box_1 / 3) == Math.floor(box_2 / 3))
        [x1, y1, x2, y2] = box_1 < box_2 ? connect_horizontal(c1, c2) : connect_horizontal(c2, c1);

    else if (box_1 % 3 == box_2 % 3)
        [x1, y1, x2, y2] = box_1 < box_2 ? connect_vertical(c1, c2) : connect_vertical(c2, c1);

    else
        [x1, y1, x2, y2] = connect_diagonal(c1, c2);

    lines.innerHTML += `<circle cx="${x1}" cy="${y1}" r="2" fill="red"/>`;
    lines.innerHTML += `<circle cx="${x2}" cy="${y2}" r="2" fill="red"/>`;
    lines.innerHTML += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="1" stroke="black"/>`;
}

const connect_horizontal = (left, right) => {
    const bcr_left = left.getBoundingClientRect();
    const bcr_right = right.getBoundingClientRect();
    let x1 = bcr_left.right - lines_bcr.left;
    let y1 = bcr_left.top + 30 - lines_bcr.top;

    let x2 = bcr_right.left - lines_bcr.left;
    let y2 = bcr_right.top + 30 - lines_bcr.top

    return [x1, y1, x2, y2];
};

const connect_vertical = (top, bottom) => {
    const bcr_top = top.getBoundingClientRect();
    const bcr_bottom = bottom.getBoundingClientRect();
    let x1 = bcr_top.left + 30 - lines_bcr.left;
    let y1 = bcr_top.bottom - lines_bcr.top;

    let x2 = bcr_bottom.left + 30 - lines_bcr.left;
    let y2 = bcr_bottom.top - lines_bcr.top

    return [x1, y1, x2, y2];
};

const connect_diagonal = (a, b) => {
    const bcr_a = a.getBoundingClientRect();
    const bcr_b = b.getBoundingClientRect();

    const row_a = a.getAttribute('row');
    const col_a = a.getAttribute('col');

    const row_b = b.getAttribute('row');
    const col_b = b.getAttribute('col');

    let x1, y1, x2, y2;
    if (row_b > row_a) {
        y1 = bcr_a.bottom - lines_bcr.top;
        y2 = bcr_b.top - lines_bcr.top
    } else {
        y1 = bcr_a.top - lines_bcr.top;
        y2 = bcr_b.bottom - lines_bcr.top
    }

    if (col_b > col_a) {
        x1 = bcr_a.right - lines_bcr.left;
        x2 = bcr_b.left - lines_bcr.left;
    } else {
        x1 = bcr_a.left - lines_bcr.left;
        x2 = bcr_b.right - lines_bcr.left;
    }

    return [x1, y1, x2, y2];
};

const show_lines = group => {
    lines.style.zIndex = '0';
    for(let i = 0; i < group.length - 1; i++){
        draw(group[i], group[i+1]);
    }
};

const hide_lines = () => {
    lines.style.zIndex = '';
    lines.innerHTML = '';
}