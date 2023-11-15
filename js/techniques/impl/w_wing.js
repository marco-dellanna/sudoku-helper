const w_wing_impl = () => {

    const found = [];

    for (let i = 1; i < 10; i++)
        for (let j = 0; j < 9; j++) {
            let row = unsolved_row_cells(j);
            let col = unsolved_col_cells(j);
            let box = unsolved_box_cells_by_index(j);

            row = filter_cells_with_candidate(row, i);
            col = filter_cells_with_candidate(col, i);
            box = filter_cells_with_candidate(box, i);

            w_wing_test(row, i, found);
            w_wing_test(col, i, found);
            w_wing_test(box, i, found);
        }


    return found;
};

const w_wing_test = (unit, val, found) => {
    if (unit.length == 2) {
        let one = filter_cells_with_candidate(bivalued_cells_seen_by(unit[0]), val);
        let two = filter_cells_with_candidate(bivalued_cells_seen_by(unit[1]), val);
        one = one.filter(c => c != unit[1]);
        two = two.filter(c => c != unit[0]);
        for (let i = 0; i < one.length; i++) {
            for (let j = 0; j < two.length; j++) {
                const cand_one = get_candidate_list(one[i]).map(c => c.textContent);
                const cand_two = get_candidate_list(two[j]).map(c => c.textContent);
                // IS IT A WING ?
                let add_wing = cand_one.every(c => cand_two.includes(c));
                // IS THE WING EFFECTIVE ?
                add_wing = add_wing && is_chain_effective(one[i], two[j], val);
                if (add_wing) found.push({ candidate: val, head_tail: [one[i], two[j]], link: unit });
            }
        }
    }

};