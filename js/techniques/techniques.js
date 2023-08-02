const btn_naked_single = document.querySelector('.naked_single');
btn_naked_single.addEventListener('click', naked_single);


const btn_hidden_single = document.querySelector('.hidden_single');
btn_hidden_single.addEventListener('click', hidden_single);

const btn_pointing_cells = document.querySelector('.pointing_cells');
btn_pointing_cells.addEventListener('click', pointing_cells);

const btn_linebox_reduction = document.querySelector('.linebox_reduction');
btn_linebox_reduction.addEventListener('click', linebox_reduction);

const btn_naked_subset = document.querySelector('.naked_subset');
btn_naked_subset.addEventListener('click', naked_subset);

const btn_hidden_subset = document.querySelector('.hidden_subset');
btn_hidden_subset.addEventListener('click', hidden_subset);

const btn_x_wing = document.querySelector('.x_wing');
btn_x_wing.addEventListener('click', () => fish(2));

const btn_swordfish = document.querySelector('.swordfish');
btn_swordfish.addEventListener('click', () => fish(3));

const btn_jellyfish = document.querySelector('.jellyfish');
btn_jellyfish.addEventListener('click', () => fish(4));