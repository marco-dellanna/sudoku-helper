const fish_impl = (k) => {
    let found = [];

    const unit_combinations = get_combinations(unit_index_array, k);
    
    for (let val = 1; val < 10; val++) {
    
        for(const comb of unit_combinations){
            const row_fish = is_k_fish(comb, val, k, unsolved_row_cells, unsolved_col_cells, 'col');
            if(row_fish) found.push({ value: val, unit: 'r', fish: row_fish });

            const col_fish = is_k_fish(comb, val, k, unsolved_col_cells, unsolved_row_cells, 'row');
            if(col_fish) found.push({ value: val, unit: 'c', fish: col_fish });
        }
    }

    return found;
}

const unit_index_array = [0,1,2,3,4,5,6,7,8];

const is_k_fish = (comb, val, k, get_unit_1, get_unit_2, dir) => {
    let unitset = comb.map(u => filter_cells_with_candidate(get_unit_1(u), val));
    if(unitset.some(group => group.length < 2)) return null;// HIDDEN SINGLE
    unitset = merge_set(unitset.flat());
    const check_group = merge_set(unitset.map(c => c.getAttribute(dir)));
    return (check_group.length == k && 
        off_group_elimination(
            check_group.map(index => get_unit_2(index)).flat(), 
            unitset, 
            [val])) ? unitset : null;
            

}