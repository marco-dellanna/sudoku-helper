const fish_view = (found, fish_type) => {

    if (!found.length) {
        techniques_results.innerHTML = `<h2>No ${fish_type} found</h2>`;
        return;
    }

    techniques_results.innerHTML = `<h2>${fish_type}:</h2>`;

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    for (const f of found) {

        const row_set = merge_set(f.fish.map(c => 1 + c.r()));
        const col_set = merge_set(f.fish.map(c => 1 + c.c()));
        let highlight = row_set.map(r => row_cells(r-1)).concat(col_set.map(c => col_cells(c-1))).flat();
        let label1, label2;
        switch (f.unit) {
            case 'r':
                label1 = `row ${row_set.join(', ')}`;
                label2 = `column ${col_set.join(', ')}`;
                break;
            case 'c':
                label1 = `column ${col_set.join(', ')}`;
                label2 = `row ${row_set.join(', ')}`;
                break;
        }

        const li = document.createElement('LI');
        ul.append(li);
        li.innerHTML = `In ${label1}, candidate cells for the digit ${f.value} lie in ${label2}. The digit ${f.value} is eliminated from the remaining cells of ${label2}.`;

        li.addEventListener('mouseenter', () => {
            clear_highlight();
            highlight_candidates_by_cell_list(highlight)
            double_highlight_candidates_by_cell_list(f.fish);
        });
        li.addEventListener('mouseout', clear_highlight);
    }
};

const fish = (k, fish_type) => fish_view(fish_impl(k), fish_type);
