const randcol = () => (Math.random() * 255).toFixed(0);
const medusa_impl = () => {
    const found = { '1': [], '2': [], '3': [], '4': [], '5': [], '6': [] };
    let graph_index = 1;
    // INITIALIZE A MATRIX HOLDING INFO REGARDING COLORED CANDIDATES
    const candidate_matrix = init_matrix();
    // PICK THE STARTING CANDIDATE AS THE FIRST UNCOLORED ONE
    let uncolored_candidate = next_candidate(candidate_matrix);
    while (uncolored_candidate) {
        // SET THE CANDIDATE GRAPH INDEX
        uncolored_candidate.index = graph_index;
        // SET THE STARTING CANDIDATE COLOR
        uncolored_candidate.color = 1; let temp1 = `rgb(${randcol()},${randcol()},${randcol()})`; let temp2 = `rgb(${randcol()},${randcol()},${randcol()})`;
        // CREATE THE QUEUE OF CANDIDATES TO EXPLORE
        const queue = [uncolored_candidate];
        // CONTINUE UNTIL THERE ARE CANDIDATES TO EXPLORE
        while (queue.length) {
            const g = queue.shift(); g.td.style.backgroundColor = g.color > 0 ? temp1 : temp2;

            const val = g.td.textContent;
            const r = unsolved_row_cells_with_candidate(g.cell.r(), val);
            const c = unsolved_col_cells_with_candidate(g.cell.c(), val);
            const b = unsolved_box_cells_with_candidate(g.cell.b(), val);

            explore_bilocation(r, g, queue, candidate_matrix, graph_index);
            explore_bilocation(c, g, queue, candidate_matrix, graph_index);
            explore_bilocation(b, g, queue, candidate_matrix, graph_index);
            explore_bivalue(g, queue, candidate_matrix, graph_index);
        }

        check_rules(candidate_matrix, graph_index, found);

        graph_index++;
        uncolored_candidate = next_candidate(candidate_matrix);
    }

    return found;
};

const init_matrix = () => {
    // CREATE A MATRIX OF OBJECTS
    const matrix = [];
    for (let i = 0; i < 9; i++) {
        matrix.push([]);
        for (let j = 0; j < 9; j++) {
            matrix[i].push([]);
            if (!is_solved(cells[i][j])) {
                const list = get_candidate_list_by_index(i, j);
                list.forEach(c => matrix[i][j].push({
                    // THE CANDIDATE
                    td: c,
                    // THE CELLS WHERE THE CANDIDATE IS LOCATED
                    cell: cells[i][j],
                    // THE ON-OFF FLAG
                    color: undefined,
                    // THE GRAPH THE CANDIDATE BELONGS TO
                    index: undefined
                }));
            }
        }
    }
    return matrix;
};

const next_candidate = m => {
    // RETURN THE FIRST CANDIDATE THAT HAS NOT BEEN VISITED
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
            for (const c of m[i][j])
                if (!c.index) return c;
    return null;
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

const check_rules = (m, index, f) => {
    const linearized = m.flatMap(c => c).flatMap(c => c);
    for (let i = 0; i < linearized.length; i++) {
        const [seen_cell, seen_row, seen_col, seen_box] = candidates_seen_by(linearized[i], linearized, index);
        rule_1(linearized[i], seen_cell, index, f);
        rule_2(linearized[i], seen_row, index, f);
        rule_2(linearized[i], seen_col, index, f);
        rule_2(linearized[i], seen_box, index, f);
        rule_3(linearized[i], seen_cell, index, f);
        // SINGLE CELL RULES: (TWICE) OR (TWO COLORS) IN A CELL
        //rule_1_3(i, j, m, index, f);
        //rule_4_5_6(i, j, m, index, f);

        //const ith_row = m[i];
        //const ith_col = m.map(r => r[i]);
        //const ith_box = m.flatMap(c => c).filter(r => r.length && r[0].cell.b() == i);


    }
};

const rule_1 = (cand, seen, index, f) => {
    if(cand.index != index) return;
    seen.forEach(c => {
        if (c.index == index && c.color == cand.color)
            f['1'].push({ cell: cand.cell, list: [cand, c] });
    });
};

const rule_2 = (cand, seen, index, f) => {
    if(cand.index != index) return;
    seen.forEach(c => {
        if (c.index == index && c.td.textContent == cand.td.textContent && c.color == cand.color)
            f['2'].push({ cell: cand.cell, list: [cand, c] });
    });
};

const rule_3 = (cand, seen, index, f) => {
    if(cand.index != index) return;
    seen.forEach(c => {
        if (c.index == index && c.color != cand.color && seen.length > 1)
            f['3'].push({ cell: cand.cell, list: [cand, c] });
    });
};

const candidates_seen_by = (cand, linear, index) => {
    const same_cell = [];
    const same_row = [];
    const same_col = [];
    const same_box = [];
    linear.forEach(c => {
        if(c != cand){
            if(c.cell == cand.cell) same_cell.push(c);
            if(c.cell.r() == cand.cell.r()) same_row.push(c);
            if(c.cell.c() == cand.cell.c()) same_col.push(c);
            if(c.cell.b() == cand.cell.b()) same_box.push(c);
        }
    });
        
    return [same_cell, same_row, same_col, same_box];
}