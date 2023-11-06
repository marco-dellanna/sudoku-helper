const hidden_single_impl = () => {
    let found = [];

    // LOOP THROUGH ALL UNITS (ROWS, CELLS AND BOXES)
    for (let i = 0; i < 9; i++) {
        // GET UNIT CELLS
        const current_row = row_cells(i);
        const current_col = col_cells(i);
        const current_box = box_cells_by_index(i);
        // LOOP THROUGH ALL POSSIBLE CANDIDATES
        for (let val = 1; val < 10; val++) {
            // CHECK IF THE CANDIDATE APPEARS ONLY IN ONE CELL OF THE UNIT

            const row_single = is_single(current_row, val);
            if (row_single) found.push({ value: val, unit: 'r', hidden: row_single });

            const col_single = is_single(current_col, val);
            if (col_single) found.push({ value: val, unit: 'c', hidden: col_single });

            const box_single = is_single(current_box, val);
            if (box_single) found.push({ value: val, unit: 'b', hidden: box_single });
        }
    }

    return found;
}
