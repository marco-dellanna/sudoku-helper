const bug_view = found => {

    if (!found) {
        techniques_results.innerHTML = 'No BUG found';
        return;
    }

    techniques_results.innerHTML = '';

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    const r = found[0].getAttribute('row');
    const c = found[0].getAttribute('col');
    
    const li = document.createElement('LI');
    ul.append(li);
    li.innerText = `BUG found in R${1 + +r}C${1 + +c}, ${found[1]} must be the solution. Other candidates would create two or more solutions so they can be removed`;
    
    li.addEventListener('mouseenter', () => {
        clear_highlight();
        highlight_candidates_by_cell_list([cells[r][c]]);
    });
    li.addEventListener('mouseout', clear_highlight);
    
};

const bug = () => bug_view(bug_impl());