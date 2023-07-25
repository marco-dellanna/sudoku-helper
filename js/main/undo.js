const history = [];

const undo_step = () => {
    if(!history.length) return;
    history.pop()();
    check();
};

document.querySelector('.undo').addEventListener('click', undo_step);