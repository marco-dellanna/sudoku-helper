const hint = () => {
    for (const s of stategies_list) {
        const found = s.impl();
        if(found.length){
            s.view([found[0]]);
            return;
        }
    }
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
    }
];