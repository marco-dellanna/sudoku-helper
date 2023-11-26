const x_cycle = () => {
    const found = [];

    // LOOP THROUGH ALL CANDIDATES
    for (let val = 1; val < 10; val++) {

        // IDENTIFY ALL STRONG LINKS FOR THIS CANDIDATE
        const strong_links = [];
        for (let i = 0; i < 9; i++) {
            const row = filter_cells_with_candidate(unsolved_row_cells(i), val);
            const col = filter_cells_with_candidate(unsolved_col_cells(i), val);
            const box = filter_cells_with_candidate(unsolved_box_cells(i), val);

            check_strong_link(row, strong_links);
            check_strong_link(col, strong_links);
            check_strong_link(box, strong_links);
        }

        explore_cycles(strong_links, found);

    }
};

const check_strong_link = (group, strong_links) => {
    if (group.length == 2) {
        strong_links.push({
            one: group.at(0),
            two: group.at(1)
        });
    }
};

const explore_cycles = (strong_links, found) => {
    const cycles = strong_links.slice(0);
    while (cycles.length) {
        const c = cycles.shift();

        const seen_by_head = cells_seen_by(c.list.at(0));
        const seen_by_tail = cells_seen_by(c.list.at(-1));
        for (const sl of strong_links) {
            const one = sl.list.at(0);
            const two = sl.
        }
    }
}