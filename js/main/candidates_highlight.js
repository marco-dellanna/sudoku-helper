let highlighted_candidate = null;

const btn_candidates = document.querySelectorAll('.candidates_highlight div');
btn_candidates.forEach((box, index) => box.addEventListener('click', (ev) => {

    const c = highlighted_candidate;
    clear_highlight()

    // CLICK ON A NEW CANDIDATE BOX - TURN ON/MOVE HIGHLIGHTING
    if(c != index + 1){
        highlighted_candidate = index + 1;
        highlight_candidates_by_value(index + 1);
    }
}));

const highlight_candidates_by_value = (val) => {
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            cells[i][j].classList.remove('highlighted');
            if(!is_solved(cells[i][j]) && has_candidate(cells[i][j], val)) cells[i][j].classList.add('highlighted');
        }
    }
    btn_candidates[val-1].classList.add('selected');
}

const highlight_candidates_by_cell_list = (list) => {
    for(const c of list) c.classList.add('highlighted');
}

const double_highlight_candidates_by_cell_list = (list) => {
    for(const c of list) c.classList.add('double-highlighted');
}

const clear_highlight = () => {
    highlighted_candidate = null;
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++){
            cells[i][j].classList.remove('highlighted');
            cells[i][j].classList.remove('double-highlighted');
        }
        btn_candidates[i].classList.remove('selected');
    }
}

