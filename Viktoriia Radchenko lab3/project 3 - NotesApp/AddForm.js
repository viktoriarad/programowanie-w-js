const AddForm = () => {
    const noteForm = document.querySelector('.noteForm');
    const popupCreateNote = document.querySelector('.newNote');
    const closeNoteBtn = document.querySelector('.closeIconCreateNote');
    const newNoteTitle = document.getElementById('new-note-title');
    const newNoteDescription = document.getElementById('new-note-description');
    const newNotePinned = document.getElementById('new-note-pinned');
    const newNoteAllColors = document.querySelectorAll('.new-note-color');

    let formOpeningDOMActions;
    let formClosingDOMActions;
    let renderDOM;
    let storeNoteHandler;

    const setActionsFormOpening = (functionToSet) => {
        formOpeningDOMActions = functionToSet;
    };

    const setActionsFormClosing = (functionToSet) => {
        formClosingDOMActions = functionToSet;
    };

    const setDOMRender = (functionToSet) => {
        renderDOM = functionToSet;
    };

    const setStoreNoteHandler = (functionToSet) => {
        storeNoteHandler = functionToSet;
    };

    const showAddNoteForm = () => {
        popupCreateNote.classList.add('newNoteActive');
        formOpeningDOMActions();
    };

    const hideAddNoteForm = () => {
        clearForm();
        popupCreateNote.classList.remove('newNoteActive');
        formClosingDOMActions();
    };

    const clearForm = () => {
        clearAllColorsAddForm();
        newNoteTitle.value = "";
        newNoteDescription.value = "";
        newNotePinned.checked = false;
    };

    // Funkcja wykasuje zaznoczony kolor w formie dodawania nowej notatki
    const clearAllColorsAddForm = () => {
        newNoteAllColors.forEach(el => {
            el.classList.remove('new-note-color-selected');
        })
    };

    // Funkcja ktora odpowiada za dodanie notatki i zresetowanie formularza dodawania notatki do defaultowych wartosci
    const addNewNote = (e) => {
        const selectedColor = Array.from(newNoteAllColors).find(el => el.classList.contains('new-note-color-selected'));

        const note = {
            title: newNoteTitle.value,
            description: newNoteDescription.value,
            color: selectedColor ? selectedColor.dataset.color : "",
            pinned: newNotePinned.checked
        };

        e.preventDefault();
        storeNoteHandler(note);
        renderDOM();
        hideAddNoteForm();
    };

    // Dodawanie nasluchiwan na submit przyciski w formularzach dodawania i edytowania notatek
    noteForm.addEventListener('submit', (e) => addNewNote(e));

    // Dodawanie nasluchiwania na przycisk zamkniecia formularzu dodawania notatki
    closeNoteBtn.addEventListener('click', hideAddNoteForm);

    // Dodawanie nasluchiwan klikniecia myszki na wszystkie kolory w formularzu dodawania notatki
    newNoteAllColors.forEach(el => {
        el.addEventListener('click', (e) => {
            const wasAlreadySelected = e.target.classList.contains('new-note-color-selected');

            clearAllColorsAddForm();
            if (wasAlreadySelected) return;
            e.target.classList.add('new-note-color-selected');
        })
    });

    return {
        setActionsFormOpening,
        setActionsFormClosing,
        setDOMRender,
        setStoreNoteHandler,
        showAddNoteForm
    }
};