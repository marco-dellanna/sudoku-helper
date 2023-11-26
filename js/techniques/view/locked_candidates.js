const pointing_cells_view = found => {

    if (!found.length) {
        techniques_results.innerHTML = '<h2>No pointing cells found</h2>';
        return;
    }

    techniques_results.innerHTML = '<h2>Pointing cells:</h2>';

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    for (const f of found) {

        const r = f.pointing[0].r();
        const c = f.pointing[0].c();
        const b = f.pointing[0].b();

        let label, highlight = box_cells(b);
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
            clear_highlight();
            highlight_candidates_by_cell_list(highlight)
            double_highlight_candidates_by_cell_list(f.pointing);
        });
        li.addEventListener('mouseout', clear_highlight);
    }
}

const linebox_reduction_view = found => {

    if (!found.length) {
        techniques_results.innerHTML = '<h2>No line-box reduction found</h2>';
        return;
    }

    techniques_results.innerHTML = '<h2>Line-box reduction:</h2>';

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    for (const f of found) {

        const r = f.pointing[0].r();
        const c = f.pointing[0].c();
        const b = f.pointing[0].b();

        let label, highlight = box_cells(b);
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
            clear_highlight();
            highlight_candidates_by_cell_list(highlight)
            double_highlight_candidates_by_cell_list(f.pointing);
        });
        li.addEventListener('mouseout', clear_highlight);
    }
};

const pointing_cells = () => pointing_cells_view(pointing_cells_impl());
const linebox_reduction = () => linebox_reduction_view(linebox_reduction_impl());