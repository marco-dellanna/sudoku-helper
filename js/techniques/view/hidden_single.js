const hidden_single_view = found => {

    if (!found.length) {
        techniques_results.innerHTML = '<h2>No hidden single found</h2>';
        return;
    }

    techniques_results.innerHTML = '<h2>Hidden single:</h2>';

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    for (const f of found) {

        const r = f.hidden.r();
        const c = f.hidden.c();
        const b = f.hidden.b();

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
                highlight = box_cells(b);
                break;
        }

        const li = document.createElement('LI');
        ul.append(li);
        li.innerHTML = `In ${label}, the only cell with candidate ${f.value} is ${describe_group([f.hidden])}.`;

        li.addEventListener('mouseenter', () => {
            clear_highlight();
            highlight_candidates_by_cell_list(highlight)
            double_highlight_candidates_by_cell_list([f.hidden]);
        });
        li.addEventListener('mouseout', clear_highlight);
    }
};

const hidden_single = () => hidden_single_view(hidden_single_impl());