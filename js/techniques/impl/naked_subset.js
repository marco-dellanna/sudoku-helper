const naked_subset_impl = (k) => {

    const found = [];

    for (let i = 0; i < 9; i++) {
        const row_cells = unsolved_row_cells(i).filter(c => get_candidate_list(c).length > 1);
        const col_cells = unsolved_col_cells(i).filter(c => get_candidate_list(c).length > 1);
        const box_cells = unsolved_box_cells_by_index(i).filter(c => get_candidate_list(c).length > 1);
        is_unit_k_naked(row_cells, i, 'row', 'r', k, found);
        is_unit_k_naked(col_cells, i, 'col', 'c', k, found);
        is_unit_k_naked(box_cells, i, 'box', 'b', k, found);
    }

    return found;
}



const is_k_naked = (combinations, size) => {
    return combinations.filter(temp => merge_candidates(temp).length == size);
}

const merge_candidates = group => {
    const values = new Set();
    for (const g of group)
        for (const c of get_candidate_list(g))
            values.add(c.textContent);
    return [...values];
}

const is_unit_k_naked = (current_unit, index, dir, unit, k, found) => {
    const unit_combs = get_combinations(current_unit, k);
    const unit_subset = is_k_naked(unit_combs, k);
    for (const sub of unit_subset) {
        const cand_merge = merge_candidates(sub).sort();
        if (off_group_elimination(current_unit, sub, cand_merge))
            found.push({ unit: unit, subset: sub, values: cand_merge.join(', ') });
    }
}