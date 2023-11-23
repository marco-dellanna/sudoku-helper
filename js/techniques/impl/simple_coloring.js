const simple_coloring = () => {

    let val = 3;

    const matrix = marking_matrix(val);
    const unmarked = next_unmarked_cell(matrix, val);
    while (unmarked) {

        // BFS ROOTED IN THE FIRST UNMARKED CELL FOUND

        const graph = [unmarked];

        while (graph.length) {
            const g = graph.shift();

            let row = g.getAttribute('row');
            row = unsolved_row_cells(row);
            // BI-LOCATION ON THE ROW FOR THIS CANDIDATE
            if (row.length == 2) {

            }

            

        }


        next_unmarked = next_unmarked_cell(matrix, val);
    }

    return found;
};

const next_unmarked_cell = (m, val) => {
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; i++)
            if (!m[i][j])
                return cells[i][j];

};

const marking_matrix = val => {
    const matrix = [];
    for (let i = 0; i < 9; i++) {
        matrix.push([]);
        for (let j = 0; j < 9; i++)
            if (!is_solved(cells[i][j]) && has_candidate(cells[i][j], val))
                matrix.push(false);
            else
                matrix.push(true);
    }
}