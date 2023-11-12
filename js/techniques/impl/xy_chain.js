const xy_chain_impl = (max_length) => {

    // LOOP THROUGH ALL UNSOLVED CELLS
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // FIND BIVALUED CELLS
            const candidate_list = get_candidate_list_by_index(i, j);
            if (candidate_list.length == 2) {
                // START THE SEARCH FOR CHAINS
                BFS_chain(cells[i][j], candidate_list);

            }
        }
    }

};


const BFS_chain = (root, cand_list) => {
    const queue = [{
        node: root,
        length: 1,
        common: cand_list[0],
        head: cand_list[1]
    },
    {
        node: root,
        length: 1,
        common: cand_list[1],
        head: cand_list[0]
    }];
    const result = [];
    let q;
    let first_round = true;
    while (queue.length) {
        q = queue.shift();
        const seen_by_with_common_candidate = filter_cells_with_candidate(
            bivalued_cells_seen_by(q.node),
            q.common.textContent
        );
        for (const c of seen_by) {
            queue.push(c);
            if (!first_round /* && is a chain*/)
                result.push({
                    node: c,
                    length: q.length+1,
                    common: 3
                });
        }
        first_round = false;
    }
    return result
}