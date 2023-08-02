const fish = (k) => {
    const found = fish_impl(k);

    let fish_type;
    switch (k) {
        case 2:
            fish_type = 'X-Wing';
            break;
        case 3:
            fish_type = 'Swordfish';
            break;
        case 4:
            fish_type = 'Jellyfish';
            break;
    }

    if (!found.length) {
        techniques_results.innerHTML = `No ${fish_type} found`;
        return;
    }

    techniques_results.innerHTML = '';

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    for (const f of found) {

        const row_set = merge_set(f.fish.map(c => 1 + +c.getAttribute('row')));
        const col_set = merge_set(f.fish.map(c => 1 + +c.getAttribute('col')));
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
            highlight_candidates_by_cell_list(highlight)
            double_highlight_candidates_by_cell_list(f.fish);
        });
        li.addEventListener('mouseout', clear_highlight);
    }
}
