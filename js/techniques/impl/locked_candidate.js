const pointing_cells_impl = () => {
    let found = [];

    for (let i = 0; i < 9; i++) {
        const current_box = unsolved_box_cells_by_index(i);
        for (let val = 1; val < 10; val++) {
            is_unit_compact(current_box, val, 'row', 'r', unsolved_row_cells, found);
            is_unit_compact(current_box, val, 'col', 'c', unsolved_col_cells, found);
        }
    }

    return found;
}

const linebox_reduction_impl = () => {
    let found = [];

    for (let i = 0; i < 9; i++) {
        const current_row = unsolved_row_cells(i);
        const current_col = unsolved_col_cells(i);

        for (let val = 1; val < 10; val++) {
            is_unit_compact(current_row, val, 'box', 'r', unsolved_box_cells_by_index, found);
            is_unit_compact(current_col, val, 'box', 'c', unsolved_box_cells_by_index, found);
        }
    }

    return found;
}

const is_compact = (unit, val, direction) => {
    const filter_unit = filter_cells_with_candidate(unit, val)

    // ESCLUDI HIDDEN SINGLES
    if (filter_unit.length < 2) return null;

    let group_compact = filter_unit.map(c => c.getAttribute(direction));
    return group_compact.every(c => c == group_compact[0]) ? filter_unit : null;
}

const is_unit_compact = (current_unit, val, dir, unit, get_group, found) => {
    let unit_compact = is_compact(current_unit, val, dir);
    if (unit_compact) {
        const index = unit_compact[0].getAttribute(dir);
        if (off_group_elimination(get_group(index), unit_compact, [val]))
            found.push({ value: val, unit: unit, pointing: unit_compact });
    }
}