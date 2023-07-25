const hidden_subset = () => {
    techniques_results.innerHTML = '';
    
    display_hidden_subset(2, 'pair');
    display_hidden_subset(3, 'triple');
    display_hidden_subset(4, 'quad');    
}

const display_hidden_subset = (k, type) => {
    const found = hidden_subset_impl(k);

    if (!found.length) {
        techniques_results.innerHTML += `<p>No hidden ${type}s found</p>`;
        return;
    }

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
            highlight_candidates_by_cell_list(highlight)
            double_highlight_candidates_by_cell_list(f.subset);
        });
        li.addEventListener('mouseout', clear_highlight);
    }
}