const naked_single_view = found => {

    if (!found.length) {
        techniques_results.innerHTML = '<h2>No naked singles found</h2>';
        return;
    }

    techniques_results.innerHTML = '<h2>Naked single:</h2>';

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    for (const f of found) {        
        const li = document.createElement('LI');
        ul.append(li);
        li.innerText = `The only candidate for cell ${describe_group([f.naked])} is ${f.value}`;
        
        li.addEventListener('mouseenter', () => {
            clear_highlight();
            highlight_candidates_by_cell_list([cells[r][c]]);
        });
        li.addEventListener('mouseout', clear_highlight);
    }

}

const naked_single = () => naked_single_view(naked_single_impl());