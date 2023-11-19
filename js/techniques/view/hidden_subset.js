const hidden_subset_view = () => {
    techniques_results.innerHTML = '';
    display_hidden_subset(hidden_subset_impl(2), 'pair');
    display_hidden_subset(hidden_subset_impl(3), 'triple');
    display_hidden_subset(hidden_subset_impl(4), 'quad');    
}

const hidden_subset_view_one_type = (found, type) => {
    techniques_results.innerHTML = '';
    display_hidden_subset(found, type);
};

const display_hidden_subset = (found, type) => {

    if (!found.length) {
        const p = document.createElement('P');
        p.textContent = `No hidden ${type} found`
        techniques_results.append(p);
        return;
    }

    techniques_results.innerHTML += `<h2>Hidden ${type}:</h2>`;

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    for (const f of found) {

        const r = f.subset[0].getAttribute('row');
        const c = f.subset[0].getAttribute('col');
        const b = f.subset[0].getAttribute('box');

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
        li.innerHTML = `In ${label}, the ${type} ${f.values} can be placed only in cells ${describe_group(f.subset)}. The remaining digits are eliminated from these cells.`;

        li.addEventListener('mouseenter', () => {
            clear_highlight();
            highlight_candidates_by_cell_list(highlight)
            double_highlight_candidates_by_cell_list(f.subset);
        });
        li.addEventListener('mouseout', clear_highlight);
    }
};

const hidden_subset = hidden_subset_view;