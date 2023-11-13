const pointing_cells_impl = () => {
    let found = [];

    // LOOP THROUGH ALL THE BOXES
    for (let i = 0; i < 9; i++) {
        // GET BOX CELLS
        const current_box = unsolved_box_cells_by_index(i);
        // LOOP THROUGH ALL POSSIBLE CANDIDATES
        for (let val = 1; val < 10; val++) {
            // CHECK IF THE CELLS THAT HAVE THE CANDIDATE, ALL SHARE THE SAME ROW/COL
            is_unit_compact(current_box, val, 'row', 'r', unsolved_row_cells, found);
            is_unit_compact(current_box, val, 'col', 'c', unsolved_col_cells, found);
        }
    }

    return found;
}

const linebox_reduction_impl = () => {
    let found = [];

    // LOOP THROUGH ALL THE ROWS/COLS
    for (let i = 0; i < 9; i++) {
        // GET THE ROW/COL CELLS
        const current_row = unsolved_row_cells(i);
        const current_col = unsolved_col_cells(i);
        // LOOP THROUGH ALL POSSIBLE CANDIDATES
        for (let val = 1; val < 10; val++) {
            // CHECK IF THE CELLS THAT HAVE THE CANDIDATE, ALL SHARE THE SAME BOX
            is_unit_compact(current_row, val, 'box', 'r', unsolved_box_cells_by_index, found);
            is_unit_compact(current_col, val, 'box', 'c', unsolved_box_cells_by_index, found);
        }
    }

    return found;
};

const is_compact = (unit, val, direction) => {
    // GET THE CELLS THAT HAVE THE CANDIDATE
    const filter_unit = filter_cells_with_candidate(unit, val)
    // STOP IF IT IS AN HIDDEN SINGLES
    if (filter_unit.length < 2) return null;
    // EXTRACT THEIR ROW/COL/BOX VALUE
    let group_compact = filter_unit.map(c => c.getAttribute(direction));
    // CHECK IF THEY ALL HAVE THE SAME ROW/COL/BOX VALUE
    return group_compact.every(c => c == group_compact[0]) ? filter_unit : null;
};

const is_unit_compact = (current_unit, val, dir, unit, get_group, found) => {
    // FIND OUT IF THE CELLS THAT HAVE THE CANDIDATE ARE COMPACT
    let unit_compact = is_compact(current_unit, val, dir);
    // CHECK IF WE FOUND AN EFFECTIVE LOCKED CANDIDATE
    if (unit_compact && off_group_elimination(get_group(unit_compact[0].getAttribute(dir)), unit_compact, [val]))
        found.push({ value: val, unit: unit, pointing: unit_compact });
};