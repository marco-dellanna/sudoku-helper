const bug_view = found => {

    if (!found) {
        techniques_results.innerHTML = '<h2>No BUG found</h2>';
        return;
    }

    techniques_results.innerHTML = '<h2>BUG</h2>';

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    const r = found[0].r();
    const c = found[0].c();
    
    const li = document.createElement('LI');
    ul.append(li);
    li.innerText = `In ${describe_group([found[0]])}, ${found[1]} must be the solution. Other candidates would create two or more solutions so they can be removed`;
    
    li.addEventListener('mouseenter', () => {
        clear_highlight();
        highlight_candidates_by_cell_list([cells[r][c]]);
    });
    li.addEventListener('mouseout', clear_highlight);
    
};

const bug = () => bug_view(bug_impl());