const hidden_subset_impl = (k) => {

    const found = [];

    const k_combinations = get_combinations(candidate_array, k);
    
    for (let i = 0; i < 9; i++) {

        const row = unsolved_row_cells(i);
        const col = unsolved_col_cells(i);
        const box = unsolved_box_cells_by_index(i);
        for (const comb of k_combinations) {
            const row_subset = merge_cells(comb.map(c => filter_has_candidate(row, c)).flat());
            if (row_subset.length == k) {console.log(row_subset);console.log(comb);}

        }


        /*const col_subset = is_k_subset(col, k);
        found.push({ unit: 'c', subset: sub, values: [...merge_candidates(sub)].sort().join(', ') });


        const box_subset = is_k_subset(box, k);

        found.push({ unit: 'b', subset: sub, values: [...merge_candidates(sub)].sort().join(', ') });*/
    }

    return found;
}

const candidate_array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const merge_cells = group => [...new Set(group)];
