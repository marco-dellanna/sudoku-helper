const pointing_cells = () => {
    const found = pointing_cells_impl();

    if (!found.length) {
        techniques_results.innerHTML = 'No pointing pairs found';
        return;
    }

    techniques_results.innerHTML = '';

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    for (const f of found) {

        const r = f.pointing[0].getAttribute('row');
        const c = f.pointing[0].getAttribute('col');
        const b = f.pointing[0].getAttribute('box');

        let label, highlight = box_cells_by_index(b);
        switch (f.unit) {
            case 'r':
                label = `row ${1 + +r}`;
                highlight = highlight.concat(row_cells(r));
                break;
            case 'c':
                label = `column ${1 + +c}`;
                highlight = highlight.concat(col_cells(c));
                break;
        }

        const li = document.createElement('LI');
        ul.append(li);
        li.innerHTML = `In box ${1 + +b}, the only cells with candidate ${f.value} are confined to ${label}.`;

        li.addEventListener('mouseenter', () => {
            highlight_candidates_by_cell_list(highlight)
            double_highlight_candidates_by_cell_list(f.pointing);
        });
        li.addEventListener('mouseout', clear_highlight);
    }
}

const linebox_reduction = () => {
    const found = linebox_reduction_impl();

    if (!found.length) {
        techniques_results.innerHTML = 'No line box reductions found';
        return;
    }

    techniques_results.innerHTML = '';

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    for (const f of found) {

        const r = f.pointing[0].getAttribute('row');
        const c = f.pointing[0].getAttribute('col');
        const b = f.pointing[0].getAttribute('box');

        let label, highlight = box_cells_by_index(b);
        switch (f.unit) {
            case 'r':
                label = `row ${1 + +r}`;
                highlight = highlight.concat(row_cells(r));
                break;
            case 'c':
                label = `column ${1 + +c}`;
                highlight = highlight.concat(col_cells(c));
                break;
        }

        const li = document.createElement('LI');
        ul.append(li);
        li.innerHTML = `In ${label}, the only cells with candidate ${f.value} are confined to box ${1 + +b}.`;

        li.addEventListener('mouseenter', () => {
            highlight_candidates_by_cell_list(highlight)
            double_highlight_candidates_by_cell_list(f.pointing);
        });
        li.addEventListener('mouseout', clear_highlight);
    }
}