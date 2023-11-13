const xy_chain_impl = (max_length) => {

    // LOOP THROUGH ALL UNSOLVED CELLS
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // FIND BIVALUED CELLS
            const candidate_list = get_candidate_list_by_index(i, j).map(c => c.textContent);
            if (!is_solved(cells[i][j]) && candidate_list.length == 2) {
                // START THE SEARCH FOR CHAINS
                console.log(BFS_chain(cells[i][j], candidate_list));
            }
        }
    }

};


const BFS_chain = (root, cand_list) => {
    // ENQUEUE BOTH POSSIBLE CHAIN HEADS
    const queue = [
        enqueue(cand_list[0], cand_list[1], [root]),
        enqueue(cand_list[1], cand_list[0], [root])
    ];
    // DS THAT HOLDS ALL CHAINS FOUND
    const result = [];

    while (queue.length) {
        // ANALYZE THE FIRST NODE
        const q = queue.shift();
        // GET ALL THE BIVALUED CELLS SEEN BY THE LAST CELL OF THE CHAIN
        const bivalued_seen_by = bivalued_cells_seen_by(q.chain.at(-1));
        // KEEP ONLY THE CELLS THAT HAVE THE COMMON CANDIDATE
        const bivalued_with_common = filter_cells_with_candidate(bivalued_seen_by, q.common);
        // KEEP ONLY THE CELLS THAT DO NOT ALREADY BELONG TO THE CHAIN
        const bivalued_not_in_chain = bivalued_with_common.filter(c => !q.chain.includes(c));
        // EACH OF THESE REPRESENT AN EXTENSION OF THE CURRENT CHAIN
        for (const c of bivalued_not_in_chain) {
            // ENQUEUE IT TO EXPLORE FURTHER CHAINS
            const nuovo = enqueue(
                q.head,
                get_candidate_list(c).map(v => v.textContent).filter(v => v != q.common).pop(),
                q.chain.slice(0)
            );
            nuovo.chain.push(c);
            queue.push(nuovo);

            const is_long_enough = nuovo.chain.length > 2;
            const is_useful_chain = nuovo.head == nuovo.common;
            if (is_long_enough && is_useful_chain)
                result.push(nuovo);
        }
    }
    return result
}

const enqueue = (head, common, chain) => {
    return {
        head: head,
        common: common,
        chain: chain
    }
}