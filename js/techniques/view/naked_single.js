const naked_single_view = found => {

    if (!found.length) {
        techniques_results.innerHTML = 'No naked singles found';
        return;
    }

    techniques_results.innerHTML = '';

    const ul = document.createElement('UL');
    techniques_results.append(ul);

    for (const f of found) {
        const r = f.naked.getAttribute('row');
        const c = f.naked.getAttribute('col');
        
        const li = document.createElement('LI');
        ul.append(li);
        li.innerText = `The only candidate for cell R${1 + +r}C${1 + +c} is ${f.value}.`;
        
        li.addEventListener('mouseenter', () => {
            clear_highlight();
            highlight_candidates_by_cell_list([cells[r][c]]);
        });
        li.addEventListener('mouseout', clear_highlight);
    }

}

const naked_single = () => naked_single_view(naked_single_impl());