const is_solved = (c) => c.hasAttribute('solved');
const is_solved_by_index = (i, j) => is_solved(cells[i][j]);
const get_candidate_list = c => [...c.querySelectorAll('.candidate_visible')];
const get_candidate_list_by_index = (i, j) => get_candidate_list(cells[i][j]);
const has_candidate = (c, val) => c.querySelector(`.candidate_visible.C${val}`);
const filter_cells_with_candidate = (arr, val) => arr.filter(c => has_candidate(c, val));

const row_cells = (i) => cells[i];
const unsolved_row_cells = (i) => row_cells(i).filter(c => !is_solved(c));

const col_cells = (j) => cells.map(r => r[j]);
const unsolved_col_cells = (j) => col_cells(j).filter(c => !is_solved(c));

const box_cells = (i, j) => box_cells_by_index(cells[i][j].getAttribute('box'));

const unsolved_box_cells = (i, j) => box_cells(i, j).filter(c => !is_solved(c));

const box_cells_by_index = (index) => cells.flatMap(c => c).filter(c => c.getAttribute('box') == index);
const unsolved_box_cells_by_index = (index) => box_cells_by_index(index).filter(c => !is_solved(c));

const get_combinations = function (a, n, s = [], t = []) {
    return a.reduce((p, c, i, a) => {
        n > 1 ? get_combinations(a.slice(i + 1), n - 1, p, (t.push(c), t))
            : p.push((t.push(c), t).slice(0));
        t.pop();
        return p
    }, s)
};

const describe_group = group => group.map(g => `R${1 + +g.getAttribute('row')}C${1 + +g.getAttribute('col')}`).join(', ');

const off_group_elimination = (group, subgroup, values) => {
    const difference = group.filter(s => !subgroup.includes(s));
    return values.map(v => filter_cells_with_candidate(difference, v)).flat().length > 0;
}

const merge_set = group => [...new Set(group)];

const intersect_sets = (one, two) => one.filter(elem => two.includes(elem));

const merge_candidates = group => {
    const values = new Set();
    for (const g of group)
        for (const c of get_candidate_list(g))
            values.add(c.textContent);
    return [...values];
}

const filter_bivalue_cells = arr => arr.filter(c => get_candidate_list(c).length == 2);

const cells_seen_by = (c) => {
    const col = unsolved_col_cells(c.getAttribute('col'));
    const row = unsolved_row_cells(c.getAttribute('row'));
    const box = unsolved_box_cells_by_index(c.getAttribute('box'));
    return merge_set(col.concat(row).concat(box).filter(v => v != c));
}

const bivalued_cells_seen_by = (c) => filter_bivalue_cells(cells_seen_by(c));

const is_chain_effective = (head, tail, val) => {
    const seen_by_head_and_tail = intersect_sets(cells_seen_by(head), cells_seen_by(tail));
    return off_group_elimination(seen_by_head_and_tail, [head, tail], [val]);
};

const enough_clues = () => {
    let solved_cells = 0;
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
            if (is_solved(cells[i][j])) solved_cells++;
    if (solved_cells >= 17) return true;
    return false;
}