const modal = document.querySelector('.modal');
const import_modal = modal.querySelector('.import_modal');

const import_btn_main = document.querySelector('.import_sudoku');
import_btn_main.addEventListener('click', () => {
    modal.style.display = 'block';
    import_modal.style.display = 'block';
});

const import_btn_modal = document.querySelector('.import_btn');
import_btn_modal.addEventListener('click', (ev) => {
    const sudoku = ev.target.previousElementSibling.value;

    while (history.length) history.pop()();

    const select_first = new Event('click');
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
    close_modal(ev);
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

const close_modal = ev => {
    const elem = ev.target.parentElement;
    elem.style.display = '';
    elem.parentElement.style.display = '';
}