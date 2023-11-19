const xy_chain_view = found => {

    if (!found.length) {
        techniques_results.innerHTML = '<h2>No XY-chain found</h2>';
        return;
    }

    techniques_results.innerHTML = '<h2>XY-chain:</h2>';

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
            show_lines(f.chain);
        });
        li.addEventListener('mouseout', () => {
            clear_highlight();
            hide_lines();
        });
    }
};

const xy_chain = () => xy_chain_view(xy_chain_impl());