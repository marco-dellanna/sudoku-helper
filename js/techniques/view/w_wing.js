const w_wing_view = found => {

    if (!found.length) {
        techniques_results.innerHTML = '<h2>No W-wing found</h2>';
        return;
    }

    techniques_results.innerHTML = '<h2>W-wing:</h2>';

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
};

const w_wing = () => w_wing_view(w_wing_impl());