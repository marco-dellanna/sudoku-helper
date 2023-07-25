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
}

const describe_group = group => group.map(g => `R${1 + +g.getAttribute('row')}C${1 + +g.getAttribute('col')}`).join(', ');