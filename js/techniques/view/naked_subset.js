const naked_subset_view = () => {
    techniques_results.innerHTML = '';
    display_naked_subset(naked_subset_impl(2), 'pair');
    display_naked_subset(naked_subset_impl(3), 'triple');
    display_naked_subset(naked_subset_impl(4), 'quad');    
}

const naked_subset_view_one_type = (found, type) => {
    techniques_results.innerHTML = '';
    display_naked_subset(found, type);
}

const display_naked_subset = (found, type) => {

    if (!found.length) {
        const p = document.createElement('P');
        p.textContent = `<h2>No naked ${type} found</h2>`;
        techniques_results.append(p);
        return;
    }

    techniques_results.innerHTML += `<h2>Naked ${type}:</h2>`;

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    for (const f of found) {

        const r = f.subset[0].r();
        const c = f.subset[0].c();
        const b = f.subset[0].b();

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
        li.innerHTML = `In ${label}, cells ${describe_group(f.subset)} contain only the ${type} ${f.values}. These digits are eliminated from the remaining cells of ${label}.`;

        li.addEventListener('mouseenter', () => {
            clear_highlight();
            highlight_candidates_by_cell_list(highlight)
            double_highlight_candidates_by_cell_list(f.subset);
        });
        li.addEventListener('mouseout', clear_highlight);
    }
}

const naked_subset = naked_subset_view;