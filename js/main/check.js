const check_sudoku = () => {
    for (let i = 0; i < 9; i++) {
        const row_values = cells_to_solution_value(row_cells(i));
        const col_values = cells_to_solution_value(col_cells(i));
        const box_values = cells_to_solution_value(box_cells(i));
        if(has_duplicates(row_values) || has_duplicates(col_values) || has_duplicates(box_values)) return false;
    }
    return true;
}

const has_duplicates = (arr) => {
    return (new Set(arr)).size !== arr.length;
}

const cells_to_solution_value = cells_list =>  {
    return cells_list.filter(c => c.hasAttribute('solved')).map(c => c.lastElementChild.innerText);
}

const check = () => {
    if (check_sudoku())
        field.style.backgroundColor = '';
    else
        field.style.backgroundColor = 'rgba(255,0,0,0.2)';
}