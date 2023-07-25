const import_btn = document.querySelector('.import_sudoku');
import_btn.addEventListener('click', () => {
    const sudoku = prompt('input');

    while (history.length) history.pop()();

    const select_first = new Event('contextmenu');
    select_first.currentTarget = cells[0][0];
    cells[0][0].dispatchEvent(select_first);

    let digit_index = 0;
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++) {
            if (numeric_input(sudoku[digit_index])) {
                trigger_solve(cells[i][j], sudoku[digit_index]);
                trigger_move('ArrowRight');
            }
            digit_index++;
        }
});

const export_btn = document.querySelector('.export_sudoku');
export_btn.addEventListener('click', () => {
    let sudoku = '';
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
            if (is_solved(cells[i][j]))
                sudoku += cells[i][j].lastElementChild.innerText;
            else sudoku += '0';
    techniques_results.innerText = sudoku;
});