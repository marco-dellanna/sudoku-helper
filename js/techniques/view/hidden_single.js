const hidden_single = () => {
    const found = hidden_single_impl();

    if (!found.length) {
        techniques_results.innerHTML = 'No hidden singles found';
        return;
    }

    techniques_results.innerHTML = '';

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    for (const f of found) {

        const r = f.hidden.getAttribute('row');
        const c = f.hidden.getAttribute('col');
        const b = f.hidden.getAttribute('box');

        let label, highlight;
        switch (f.unit) {
            case 'r':
                label = `row ${1 + +r}`;
                highlight = row_cells(r);
                break;
            case 'c':
                label = `column ${1 + +c}`;
                highlight = col_cells(c);
                break;
            case 'b':
                label = `box ${1 + +b}`;
                highlight = box_cells_by_index(b);
                break;
        }

        const li = document.createElement('LI');
        ul.append(li);
        li.innerHTML = `In ${label}, the only cell with candidate ${f.value} is R${1 + +r}C${1 + +c}.`;

        li.addEventListener('mouseenter', () => {
            clear_highlight();
            highlight_candidates_by_cell_list(highlight)
            double_highlight_candidates_by_cell_list([f.hidden]);
        });
        li.addEventListener('mouseout', clear_highlight);
    }
}