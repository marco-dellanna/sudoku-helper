let selected_cell;

const user_interact = (event) => {
    move_selection(event);
    solve_cell(event);
};

const move_selection = (event) => {
    // CONTINUE IF A CELL IS SELECTED AND AN ARROW KEY WAS TYPED
    if (!selected_cell || !event.key.startsWith('Arrow')) return;

    let i = +selected_cell.getAttribute('row');
    let j = +selected_cell.getAttribute('col');

    // MOVE TO NEW CELL IN A CIRCULAR FASHION WHEN OVERFLOWING
    let new_selected;
    switch (event.key) {
        case 'ArrowRight':
            if (j > 7) j = -1;
            new_selected = cells[i][j + 1];
            break;
        case 'ArrowLeft':
            if (j < 1) j = 9;
            new_selected = cells[i][j - 1];
            break;
        case 'ArrowUp':
            if (i < 1) i = 9;
            new_selected = cells[i - 1][j];
            break;
        case 'ArrowDown':
            if (i > 7) i = -1;
            new_selected = cells[i + 1][j];
            break;
    }

    new_selected.dispatchEvent(new Event('contextmenu'));

    selected_cell = new_selected;
}

const solve_cell = (event) => {
    // CONTINUE IF AN UNSOLVED CELL IS SELECTED AND A VALID NUMBER WAS TYPED
    if (!selected_cell || !numeric_input(event.key) || selected_cell.hasAttribute('solved')) return;

    // INJECT VALUE AND HIDE CELL CANDIDATES
    selected_cell.setAttribute('solved', '');
    selected_cell.innerHTML += `<label>${event.key}</label>`;

    // ERODE CANDIDATES FROM OTHER CELLS
    const changed_cells = erode_candidates(event.key);

    // IF HIGHLIGHTING WAS ACTIVE THEN RE-COMPUTE IT
    if (highlighted_candidate) {
        clear_highlight();
        highlight_candidates_by_value(event.key);
    }

    const local_selected = selected_cell;

    // ROLLBACK
    history.push(() => {

        // RESTORE ERODED CANDIDATES
        for (const c of changed_cells)
            c.querySelector(`.C${event.key}`).classList.add('candidate_visible');

        // REMOVE VALUE AND SHOW CELL CANDIDATES AGAIN
        local_selected.lastElementChild.remove();
        local_selected.removeAttribute('solved');
    });

    check();
};

const select_cell = (event) => {
    event.preventDefault();

    if (selected_cell) selected_cell.classList.remove('selected');
    selected_cell = event.currentTarget;
    selected_cell.classList.add('selected');
};


document.addEventListener('keydown', user_interact);

const numeric_input = (str) => {
    const val = parseInt(str);
    if (!val || val > 9 || val < 1) return false;
    return true;
};


const trigger_solve = (cell, value) => {
    const select = new Event('contextmenu');
    select.currentTarget = cell;
    cell.dispatchEvent(select);

    const solve = new KeyboardEvent('keydown', {'key':value});
    document.dispatchEvent(solve);
}

const trigger_move = direction => {
    const move = new KeyboardEvent('keydown', {'key':direction});
    document.dispatchEvent(move);
}