document.querySelector('.toggle_candidates').addEventListener('change', () => field.classList.toggle('hidden_candidates'));

// MOSTRA/NASCONDI SINGOLO CANDIDATO CON IL TASTO SINISTRO
const toggle_candidate = (event) => {
    const td = event.target;
    td.classList.toggle('candidate_visible');

    // IF HIGHLIGHTING WAS ACTIVE THEN RE-COMPUTE IT
    if (highlighted_candidate) {
        clear_highlight();
        highlight_candidates_by_value(highlighted_candidate);
    }

    // ROLLBACK
    history.push(() => td.classList.toggle('candidate_visible'));
};