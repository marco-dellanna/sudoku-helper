const bug_impl = () => {
    let total_cells = 0;
    let bivalue_cells = 0;
    let bug_cell = null;

    // LOOP THROUGH ALL UNSOLVED CELLS
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (!is_solved(cells[i][j])) {
                // COUNT ALL UNSOLVED CELLS
                total_cells++;

                const candidate_num = get_candidate_list_by_index(i, j).length;

                // COUNT ALL BI-VALUE CELLS
                if (candidate_num == 2) bivalue_cells++;

                // SAVE CELL WITH MORE THAN 2 CANDIDATES
                if (candidate_num > 2) bug_cell = cells[i][j];
            }
        }
    }

    // ALL CELLS ARE BI-VALUED EXCEPT ONE -> BUG
    if (bivalue_cells == total_cells - 1 && bug_cell != null) {
        // FIND THE CANDIDATE THAT SOLVES THE BUG

        // GET CELLS OF A UNIT WHERE THE BUG CELL LIES (ROW, COL OR BOX)
        const bug_location = bug_cell.getAttribute('row');
        const bug_row = unsolved_row_cells(bug_location);

        // LOOP THROUGH THE BUG CELL CANDIDATES
        for (const c of get_candidate_list(bug_cell))
            // FIND THE CANDIDATE THAT APPEARS 3 TIMES IN THAT UNIT
            if (filter_cells_with_candidate(bug_row, c.textContent).length > 2)
                return [bug_cell, c.textContent];

    }

    // NO BUG FOUND
    return null;
}