const hidden_single_impl = () => {
    let found = [];

    // LOOP THROUGH ALL UNITS (ROWS, CELLS AND BOXES)
    for (let i = 0; i < 9; i++) {
        // GET UNIT CELLS
        const current_row = unsolved_row_cells(i);
        const current_col = unsolved_col_cells(i);
        const current_box = unsolved_box_cells(i);
        // LOOP THROUGH ALL POSSIBLE CANDIDATES
        for (let val = 1; val < 10; val++) {
            // CHECK IF THE CANDIDATE APPEARS ONLY IN ONE CELL OF THE UNIT
            is_single(current_row, val, 'r', found);
            is_single(current_col, val, 'c', found);
            is_single(current_box, val, 'b', found);
        }
    }

    return found;
};

const is_single = (current_unit, val, dir, found) => {
    // GET ONLY CELLS THAT HAVE THE CANDIDATE
    const with_candidate = filter_cells_with_candidate(current_unit, val);
    // CHECK IF THERE IS ONLY ONE
    if (with_candidate.length == 1) found.push({ value: val, unit: dir, hidden: with_candidate[0] });
};