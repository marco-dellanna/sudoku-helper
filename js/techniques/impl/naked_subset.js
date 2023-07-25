const naked_subset_impl = (k) => {

    const found = [];

    for (let i = 0; i < 9; i++) {
        
        const row = get_combinations(unsolved_row_cells(i), k);
        const row_subset = is_k_naked(row, k);
        for (const sub of row_subset)
            found.push({unit: 'r', subset: sub, values: merge_candidates(sub).sort().join(', ')});

        const col = get_combinations(unsolved_col_cells(i), k);
        const col_subset = is_k_naked(col, k);
        for (const sub of col_subset)
            found.push({unit: 'c', subset: sub, values: merge_candidates(sub).sort().join(', ')});

        const box = get_combinations(unsolved_box_cells_by_index(i), k);
        const box_subset = is_k_naked(box, k);
        for (const sub of box_subset)
            found.push({unit: 'b', subset: sub, values: merge_candidates(sub).sort().join(', ')});
    }

    return found;
}



const is_k_naked = (combinations, size) => {
    return combinations.filter(temp => merge_candidates(temp).length == size);
}

const merge_candidates = group => {
    const values = new Set();
    for (const g of group) 
        for(const c of get_candidate_list(g))
            values.add(c.textContent);
    return [...values];
}