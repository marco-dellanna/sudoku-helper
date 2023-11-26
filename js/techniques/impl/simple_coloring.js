const randcol = () => (Math.random() * 255).toFixed(0);
const medusa = () => {
    // INITIALIZE A MATRIX HOLDING INFO REGARDING COLORED CANDIDATES
    const candidate_matrix = init_matrix();

    // PICK THE STARTING CANDIDATE AS THE FIRST UNCOLORED ONE
    let uncolored_candidate = next_candidate(candidate_matrix);

    let graph_index = 1;

    while (uncolored_candidate) {
        // SET THE CANDIDATE GRAPH INDEX
        uncolored_candidate.index = graph_index;

        // SET THE STARTING CANDIDATE COLOR
        uncolored_candidate.color = 1;

        let temp1 = `rgb(${randcol()},${randcol()},${randcol()})`;
        let temp2 = `rgb(${randcol()},${randcol()},${randcol()})`;

        // CREATE THE QUEUE OF CANDIDATES TO EXPLORE
        const queue = [uncolored_candidate];

        // CONTINUE UNTIL THERE ARE CANDIDATES TO EXPLORE
        while (queue.length) {
            const g = queue.shift();
            g.td.style.backgroundColor = g.color > 0 ? temp1 : temp2;

            const r = g.cell.r();
            const c = g.cell.c();
            const b = g.cell.b();
            const val = g.td.textContent;

            explore_bilocation(unsolved_row_cells_with_candidate(r, val), g, queue, candidate_matrix, graph_index);
            explore_bilocation(unsolved_col_cells_with_candidate(c, val), g, queue, candidate_matrix, graph_index);
            explore_bilocation(unsolved_box_cells_with_candidate(b, val), g, queue, candidate_matrix, graph_index);
            explore_bivalue(g, queue, candidate_matrix, graph_index);
        }

        graph_index++;
        uncolored_candidate = next_candidate(candidate_matrix);
    }

};

const next_candidate = m => {
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
            for (const c of m[i][j])
                if (!c.index) return c;
    return null;
};

const init_matrix = () => {
    const matrix = [];
    for (let i = 0; i < 9; i++) {
        matrix.push([]);
        for (let j = 0; j < 9; j++) {
            matrix[i].push([]);
            if (!is_solved(cells[i][j])) {
                const list = get_candidate_list_by_index(i, j);
                list.forEach(c => matrix[i][j].push({
                    td: c,
                    cell: cells[i][j],
                    color: undefined,
                    index: undefined
                }));
            }
        }
    }
    return matrix;
};

const explore_bilocation = (unit, obj, queue, matrix, index) => {
    // CHECK FOR BI-LOCATION ON THE UNIT
    if (unit.length == 2) {
        // GET THE OTHER CELL OF THE BI-LOCATION
        const cell = unit[0] == obj.cell ? unit[1] : unit[0];
        // ACCESS THE CANDIDATE ON THE OTHER CELL IN THE CANDIDATES MATRIX
        const cand = matrix[cell.r()][cell.c()].find(c => c.td.textContent == obj.td.textContent);
        // CHECK IF THE CANDIDATE IS ALREADY COLORED
        if (cand.color) return;
        // PUT IT ASIDE TO EXPLORE IT LATER
        queue.push(cand);
        // COLOR IT WITH THE OPPOSITE COLOR OF THE CURRENT ONE
        cand.color = -1 * obj.color;
        // FLAG IT AS BELONGING TO THE CURRENT GRAPH
        cand.index = index;
    }
};

const explore_bivalue = (obj, queue, matrix, index) => {
    // CHECK FOR BI-VALUE CELL
    const c_list = matrix[obj.cell.r()][obj.cell.c()];
    if (c_list.length == 2) {
        // GET THE OPPOSITE CANDIDATE IN THE BI-VALUE CELL
        const cand = c_list[0].td == obj.td ? c_list[1] : c_list[0];
        // CHECK IF THE CANDIDATE IS ALREADY COLORED
        if (cand.color) return;
        // PUT IT ASIDE TO EXPLORE IT LATER
        queue.push(cand);
        // COLOR IT WITH THE OPPOSITE COLOR OF THE CURRENT ONE
        cand.color = -1 * obj.color;
        // FLAG IT AS BELONGING TO THE CURRENT GRAPH
        cand.index = index;
    }
};

const check_twice_in_unit = (m) => {
    for (let i = 0; i < 9; i++) {

        for (let j = 0; j < 9; j++) {

            // RULE 1 AND 3
            

        }

    }
};