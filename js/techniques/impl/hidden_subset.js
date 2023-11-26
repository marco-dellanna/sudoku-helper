const hidden_subset_impl = (k) => {

    const found = [];

    const k_combinations = get_combinations(candidate_array, k);
    
    for (let i = 0; i < 9; i++) {

        const row = unsolved_row_cells(i);
        const col = unsolved_col_cells(i);
        const box = unsolved_box_cells(i);
        for (const comb of k_combinations) {            
            let to_merge = comb.map(c => filter_cells_with_candidate(row, c));
            const row_subset = is_k_hidden(to_merge, k); 
            if(row_subset) found.push({unit: 'r', subset: row_subset, values: comb.join(', ')});
                
            to_merge = comb.map(c => filter_cells_with_candidate(col, c));
            const col_subset = is_k_hidden(to_merge, k); 
            if(col_subset) found.push({unit: 'c', subset: col_subset, values: comb.join(', ')});

            to_merge = comb.map(c => filter_cells_with_candidate(box, c));
            const box_subset = is_k_hidden(to_merge, k); 
            if(box_subset) found.push({unit: 'b', subset: box_subset, values: comb.join(', ')});
        }
    }
    
    return found;
};

const candidate_array = [1, 2, 3, 4, 5, 6, 7, 8, 9];


const is_k_hidden = (group, size) => {
    // 0 -> NOT PRESENT
    // 1 -> HIDDEN SINGLE
    if(group.some(g => g.length <= 1)) return null;
    const merged = merge_set(group.flat());
    if(merged.length == size && merge_candidates(merged).length > size) return merged;
    return null;
};