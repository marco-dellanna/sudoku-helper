const w_wing = () => {
    const found = w_wing_impl();

    if (!found.length) {
        techniques_results.innerHTML = 'No W-Wings found';
        return;
    }

    techniques_results.innerHTML = '';

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    for (const f of found) {

        const li = document.createElement('LI');
        ul.append(li);
        li.innerHTML = `BBBBBBBBBB`;

        li.addEventListener('mouseenter', () => {
            clear_highlight();
            highlight_candidates_by_cell_list(f.link);
            double_highlight_candidates_by_cell_list(f.head_tail);
        });
        li.addEventListener('mouseout', clear_highlight);
    }
}