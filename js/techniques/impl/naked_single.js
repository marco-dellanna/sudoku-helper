const naked_single_impl = () => {
    const naked = [];

    // LOOP THROUGH ALL UNSOLVED CELLS
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++) {
            const cand_list = get_candidate_list_by_index(i, j);
            // FIND UNSOLVED CELLS WITH ONLY ONE CANDIDATE
            if (!is_solved_by_index(i, j) && cand_list.length == 1)
                naked.push({ value: cand_list[0].textContent, naked: cells[i][j] });
        }

    return naked;
}