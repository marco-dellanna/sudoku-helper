const hidden_subset_impl = (k) => {

    const found = [];

    const k_combinations = get_combinations(candidate_array, k);
    
    for (let i = 0; i < 9; i++) {

        const row = unsolved_row_cells(i);
        const col = unsolved_col_cells(i);
        const box = unsolved_box_cells_by_index(i);
        for (const comb of k_combinations) {            
            let to_merge = comb.map(c => filter_cells_with_candidate(row, c));
            const row_subset = is_k_hidden(to_merge, k); 
            if(row_subset) found.push({unit: 'r', subset: row_subset, values: comb.join(', ')});
                

        }
    }
    
    return found;
}

const candidate_array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const merge_cells = group => [...new Set(group)];

const is_k_hidden = (group, size) => {
    if(group.some(g => g.length <= 0)) return null;
    const merged = merge_cells(group.flat());
    if(merged.length == size) return merged;
    return null;
}