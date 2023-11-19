const hint = () => {
    if (!enough_clues()) {
        techniques_results.innerHTML = 'Too few solved cells on the board!';
        return;
    }

    for (const s of stategies_list) {
        const found = s.impl();
        if (found.length) {
            s.view([found[0]]);
            return;
        }
    }

    techniques_results.innerHTML = 'No useful strategy found :-(';
};

const hint_btn = document.querySelector('.hint_sudoku');
hint_btn.addEventListener('click', hint);

const stategies_list = [
    {
        impl: naked_single_impl,
        view: naked_single_view
    },
    {
        impl: hidden_single_impl,
        view: hidden_single_view
    },
    {
        impl: pointing_cells_impl,
        view: pointing_cells_view
    },
    {
        impl: linebox_reduction_impl,
        view: linebox_reduction_view
    },
    {
        impl: () => naked_subset_impl(2),
        view: f => display_naked_subset(f, 'pair')
    },
    {
        impl: () => hidden_subset_impl(2),
        view: f => display_hidden_subset(f, 'pair')
    },
    {
        impl: () => naked_subset_impl(3),
        view: f => display_naked_subset(f, 'triple')
    },
    {
        impl: () => hidden_subset_impl(3),
        view: f => display_hidden_subset(f, 'triple')
    },
    {
        impl: () => naked_subset_impl(4),
        view: f => display_naked_subset(f, 'quad')
    },
    {
        impl: () => hidden_subset_impl(4),
        view: f => display_hidden_subset(f, 'quad')
    },
    {
        impl: bug_impl,
        view: bug_view
    },
    {
        impl: () => fish_impl(2),
        view: f => fish_view(f, 'X-Wing')
    },
    {
        impl: () => fish_impl(3),
        view: f => fish_view(f, 'Swordfish')
    },
    {
        impl: () => fish_impl(4),
        view: f => fish_view(f, 'Jellyfish')
    },
    {
        impl: xy_wing_impl,
        view: xy_wing_view
    },
    {
        impl: w_wing_impl,
        view: w_wing_view
    },
    {
        impl: xy_chain_impl,
        view: xy_chain_view
    },
];