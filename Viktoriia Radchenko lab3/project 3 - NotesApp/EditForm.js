const EditForm = () => {
    const editNoteForm = document.querySelector('.editNoteForm');
    const popupEditNote = document.querySelector('.editNote');
    const closeEditNoteBtn = document.querySelector('.closeIconEditNote');
    const editNoteId = document.getElementById('edit-note-id');
    const editNoteTitle = document.getElementById('edit-note-title');
    const editNoteDescription = document.getElementById('edit-note-description');
    const editNotePinned = document.getElementById('edit-note-pinned');
    const editNoteAllColors = document.querySelectorAll('.edit-note-color');

    let formOpeningDOMActions;
    let formClosingDOMActions;
    let renderDOM;
    let updateNote;
    let getAllNotes;

    const setActionsFormOpening = (functionToSet) => {
        formOpeningDOMActions = functionToSet;
    };

    const setActionsFormClosing = (functionToSet) => {
        formClosingDOMActions = functionToSet;
    };

    const setDOMRender = (functionToSet) => {
        renderDOM = functionToSet;
    };

    const setUpdateNoteHandler = (functionToSet) => {
        updateNote = functionToSet;
    };

    const setAllNotesGetter = (functionToSet) => {
        getAllNotes = functionToSet;
    };

    const showEditNoteForm = (note) => {
        editNoteTitle.value = note.title;
        editNoteDescription.value = note.description;
        editNotePinned.checked = note.pinned;
        editNoteId.value = note.id;

        if (note.color) {
            const selectedColorElement = Array.from(editNoteAllColors).find(el => el.dataset.color === note.color);
            selectedColorElement.classList.add('edit-note-color-selected');
        }

        popupEditNote.classList.add('editNoteActive');
        formOpeningDOMActions();
    };

    const hideEditNoteForm = () => {
        clearForm();
        popupEditNote.classList.remove('editNoteActive');
        formClosingDOMActions();
    };

    // Funkcja zwraca wybrany kolor istniejacej notatki w formie edytowania
    const getSelectedColorEditForm = () => {
        const selectedColor = Array.from(editNoteAllColors).find(el => el.classList.contains('edit-note-color-selected'));

        return selectedColor ? selectedColor.dataset.color : "";
    };

    // Funkcja wykasuje zaznoczony kolor w formie edytowania istniejacej notatki
    const clearAllColorsEditForm = () => {
        editNoteAllColors.forEach(el => {
            el.classList.remove('edit-note-color-selected');
        })
    };

    // Funkcja odpowiada za zapisanie zedytowanej notatki
    const saveEditedNote = (e) => {
        const noteArray = getAllNotes();
        const noteToSaveId = parseInt(editNoteId.value);
        const noteToSave = noteArray.find(el => el.id === noteToSaveId);

        noteToSave.title = editNoteTitle.value;
        noteToSave.description = editNoteDescription.value;
        noteToSave.pinned = editNotePinned.checked;
        noteToSave.color = getSelectedColorEditForm();

        e.preventDefault();
        updateNote(noteToSave);
        renderDOM();
        hideEditNoteForm();
    };

    const clearForm = () => {
        clearAllColorsEditForm();
        editNoteTitle.value = "";
        editNoteDescription.value = "";
        editNotePinned.checked = false;
    };

    // Dodawanie nasluchiwan klikniecia myszki na wszystkie kolory w formularzu edytowania notatki
    editNoteAllColors.forEach(el => {
        el.addEventListener('click', (e) => {
            const wasAlreadySelected = e.target.classList.contains('edit-note-color-selected');

            clearAllColorsEditForm();
            if (wasAlreadySelected) return;
            e.target.classList.add('edit-note-color-selected');

        })
    });

    // Dodawanie nasluchiwania na przycisk zamkniecia formularzu edytowania notatki
    closeEditNoteBtn.addEventListener('click', () => {
        popupEditNote.classList.remove('editNoteActive');
        formClosingDOMActions();
    });

    editNoteForm.addEventListener('submit', saveEditedNote);

    return {
        setActionsFormOpening,
        setActionsFormClosing,
        setDOMRender,
        setUpdateNoteHandler,
        setAllNotesGetter,
        showEditNoteForm
    }
};