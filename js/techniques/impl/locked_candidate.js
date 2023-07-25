const pointing_cells_impl = () => {
    let found = [];

    for (let i = 0; i < 9; i++) {
        const current_box = box_cells_by_index(i);

        for (let val = 1; val < 10; val++) {
            let box_compact = is_compact(current_box, val, 'row');
            if (box_compact) found.push({ value: val, unit: 'r', pointing: box_compact });

            box_compact = is_compact(current_box, val, 'col');
            if (box_compact) found.push({ value: val, unit: 'c', pointing: box_compact });
        }
    }

    return found;
}

const linebox_reduction_impl = () => {
    let found = [];

    for (let i = 0; i < 9; i++) {
        const current_row = row_cells(i);
        const current_col = col_cells(i);
        
        for (let val = 1; val < 10; val++) {
            const row_compact = is_compact(current_row, val, 'box');
            if (row_compact) found.push({ value: val, unit: 'r', pointing: row_compact });

            const col_compact = is_compact(current_col, val, 'box');
            if (col_compact) found.push({ value: val, unit: 'c', pointing: col_compact });

        }
    }

    return found;
}

const is_compact = (unit, val, direction) => {
    unit = unit.filter(c => !is_solved(c) && has_candidate(c, val));

    // ESCLUDI HIDDEN SINGLES
    if (unit.length < 2) return null;

    let group_compact = unit.map(c => c.getAttribute(direction));
    return group_compact.every(c => c == group_compact[0]) ? unit : null;
}