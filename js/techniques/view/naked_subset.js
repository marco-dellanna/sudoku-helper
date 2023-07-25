const naked_subset = () => {
    
    techniques_results.innerHTML = '';
    
    display_subset(2, 'pair');
    display_subset(3, 'triple');
    display_subset(4, 'quad');    
}


const display_subset = (k, type) => {
    const found = naked_subset_impl(k);

    if (!found.length) {
        techniques_results.innerHTML += `<p>No naked ${type}s found</p>`;
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
        li.innerHTML = `In ${label}, cells ${describe_group(f.subset)} contain only the ${type} ${f.values}. These digits are eliminated from the remaining cells of ${label}.`;

        li.addEventListener('mouseenter', () => {
            highlight_candidates_by_cell_list(highlight)
            double_highlight_candidates_by_cell_list(f.subset);
        });
        li.addEventListener('mouseout', clear_highlight);
    }
}