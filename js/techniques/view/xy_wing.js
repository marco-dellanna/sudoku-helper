const xy_wing_view = found => {

    if (!found.length) {
        techniques_results.innerHTML = 'No XY-wings found';
        return;
    }

    techniques_results.innerHTML = '';

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    for (const f of found) {

        const li = document.createElement('LI');
        ul.append(li);
        li.innerHTML = `AAAAAAAAAA`;

        li.addEventListener('mouseenter', () => {
            clear_highlight();
            highlight_candidates_by_cell_list(f.chain)
            double_highlight_candidates_by_cell_list([f.chain.at(0), f.chain.at(-1)]);
        });
        li.addEventListener('mouseout', clear_highlight);
    }
};

const xy_wing = () => xy_wing_view(xy_wing_impl());