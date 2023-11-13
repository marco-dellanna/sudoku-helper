const xy_chain_impl = (max_length = 12) => {
    let found = [];
    // LOOP THROUGH ALL UNSOLVED CELLS
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // FIND BIVALUED CELLS
            const candidate_list = get_candidate_list_by_index(i, j).map(c => c.textContent);
            if (!is_solved(cells[i][j]) && candidate_list.length == 2) {
                // START THE SEARCH FOR CHAINS
                found = found.concat(BFS_chain(found, cells[i][j], candidate_list, max_length));
            }
        }
    }
    return found;
};


const BFS_chain = (found, root, cand_list, max_length) => {
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
        // IS THE CHAIN TOO LONG ?
        if(q.chain.length >= max_length) continue;
        // GET ALL THE BIVALUED CELLS SEEN BY THE LAST CELL OF THE CHAIN
        const bivalued_seen_by = bivalued_cells_seen_by(q.chain.at(-1));
        // KEEP ONLY THE CELLS THAT HAVE THE COMMON CANDIDATE
        const bivalued_with_common = filter_cells_with_candidate(bivalued_seen_by, q.common);
        // KEEP ONLY THE CELLS THAT DO NOT ALREADY BELONG TO THE CHAIN
        const bivalued_not_in_chain = bivalued_with_common.filter(c => !q.chain.includes(c));
        // EACH OF THESE REPRESENT AN EXTENSION OF THE CURRENT CHAIN
        for (const c of bivalued_not_in_chain) {
            // ENQUEUE IT TO EXPLORE FURTHER CHAINS
            const new_chain = enqueue(
                q.head,
                get_candidate_list(c).map(v => v.textContent).filter(v => v != q.common).pop(),
                q.chain.slice(0)
            );
            new_chain.chain.push(c);
            queue.push(new_chain);

            // SHOULD I CONSIDER THIS CHAIN ?

            // IS THE CHAIN LONG ENOUGH ?
            let add_chain = new_chain.chain.length > 2;
            // IS THE CHAIN USEFUL ?
            add_chain = add_chain && new_chain.head == new_chain.common
            // HAS THE CHAIN ALREADY BEEN FOUND ?
            add_chain = add_chain && !is_already_found(found, new_chain.chain);
            // IS THE CHAIN EFFECTIVE ?
            add_chain = add_chain && is_chain_effective(new_chain);

            if (add_chain) result.push(new_chain);
        }
    }
    return result;
};

const enqueue = (head, common, chain) => {
    return {
        head: head,
        common: common,
        chain: chain
    };
};

const is_already_found = (found, chain) => {
    for (const f of found)
        if (is_reverse_chain(f.chain, chain))
            return true;
    return false;
};

const is_reverse_chain = (one, two) => {
    if (one.length != two.length) return false;
    for (let i = 0; i < one.length; i++)
        if (one[i] != two[two.length - 1 - i])
            return false;
    return true;
};

const is_chain_effective = (new_chain) => {
    const head = new_chain.chain.at(0);
    const tail = new_chain.chain.at(-1);
    const seen_by_head_and_tail = intersect_sets(cells_seen_by(head), cells_seen_by(tail));
    return off_group_elimination(seen_by_head_and_tail, [head, tail], [new_chain.head]);
};