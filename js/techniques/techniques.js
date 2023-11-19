const btn_naked_single = document.querySelector('.naked_single');
btn_naked_single.addEventListener('click', () => execute_strategy(naked_single));


const btn_hidden_single = document.querySelector('.hidden_single');
btn_hidden_single.addEventListener('click', () => execute_strategy(hidden_single));

const btn_pointing_cells = document.querySelector('.pointing_cells');
btn_pointing_cells.addEventListener('click', () => execute_strategy(pointing_cells));

const btn_linebox_reduction = document.querySelector('.linebox_reduction');
btn_linebox_reduction.addEventListener('click', () => execute_strategy(linebox_reduction));

const btn_naked_subset = document.querySelector('.naked_subset');
btn_naked_subset.addEventListener('click', () => execute_strategy(naked_subset));

const btn_hidden_subset = document.querySelector('.hidden_subset');
btn_hidden_subset.addEventListener('click', () => execute_strategy(hidden_subset));

const btn_x_wing = document.querySelector('.x_wing');
btn_x_wing.addEventListener('click', () => execute_strategy(() => fish(2, 'X-Wing')));

const btn_swordfish = document.querySelector('.swordfish');
btn_swordfish.addEventListener('click', () => execute_strategy(() => fish(3, 'Swordfish')));

const btn_jellyfish = document.querySelector('.jellyfish');
btn_jellyfish.addEventListener('click', () => execute_strategy(() => fish(4, 'Jellyfish')));

const btn_xy_wing = document.querySelector('.xy_wing');
btn_xy_wing.addEventListener('click', () => execute_strategy(xy_wing));

const btn_w_wing = document.querySelector('.w_wing');
btn_w_wing.addEventListener('click', () => execute_strategy(w_wing));

const btn_bug = document.querySelector('.bug');
btn_bug.addEventListener('click', () => execute_strategy(bug));

const btn_xy_chain = document.querySelector('.xy_chain');
btn_xy_chain.addEventListener('click', () => execute_strategy(xy_chain));

const execute_strategy = cb => {
    if (!enough_clues()) {
        techniques_results.innerHTML = 'Too few solved cells on the board!';
        return;
    }
    cb();
};