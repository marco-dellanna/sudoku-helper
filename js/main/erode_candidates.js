const erode_candidates = (solution) => {

    // NOW WE HAVE A NEW CLUE SO WE NEED TO UPDATE THE CANDIDATES
    
    const i = selected_cell.getAttribute('row');
    const j = selected_cell.getAttribute('col');

    // COLLECT ALL CELLS THAT ARE SEEN BY NEWLY SOLVED ONE BUT ALSO
    // THAT CONTAIN THE CLUE AS A CANDIDATE
    const row = filter_cells_with_candidate(row_cells(i), solution);
    const col = filter_cells_with_candidate(col_cells(j), solution);
    const box = filter_cells_with_candidate(box_cells(i,j), solution);
    
    const seen_by_cell = row.concat(col).concat(box);
    
    // REMOVE THE CANDIDATE
    for (const s of seen_by_cell) s.querySelector(`.C${solution}`).classList.remove('candidate_visible');

    // INFORM THE CALLER ON THE CELLS WE CHANGED TO ENABLE THE ROLLBACK
    return seen_by_cell;
};