const cells = [];

const field = document.querySelector('.field');

const techniques_results = document.querySelector('.techniques_results');

const init = () => {
    // CREA LA TABELLA DEI CANDIDATI
    const template_candidates = document.querySelector('template').content;

    const init_candidates = () => {
        const table = template_candidates.firstElementChild.cloneNode(true);
        table.addEventListener('click', toggle_candidate);
        return table;
    };

    // CREA LE SINGOLE CELLE E INNESTA I CANDIDATI
    let box_index = 0;
    for (let i = 0; i < 81; i++) {
        const row = Math.floor(i / 9), col = i % 9;

        let cell = document.createElement('DIV');
        cell.append(init_candidates());
        cell.addEventListener('contextmenu', select_cell);
        cell.setAttribute('row', row);
        cell.setAttribute('col', col);
        if (row % 3 == 0 && col % 3 == 0) {
            cell.setAttribute('box', box_index++);
        } else {
            const box_corner_row = Math.floor(row / 3) * 3;
            const box_corner_col = Math.floor(col / 3) * 3;
            cell.setAttribute('box', cells[box_corner_row][box_corner_col].getAttribute('box'));
        }

        // EVIDENZIA I CONFINI DEI BOX
        if (col == 2 || col == 5) cell.style.borderRight = '3px solid #000';
        if (row == 2 || row == 5) cell.style.borderBottom = '3px solid #000';

        field.append(cell);

        if (col == 0) cells.push([]);
        cells[row].push(cell);
    }

}