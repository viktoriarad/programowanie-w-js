//Inicjalizacja objektu, ktory obsluguje prace z localStorage
const noteStorage = Storage("notes");

//Inicjalizacja objektu, ktory odpowiada za pobieranie i przetwarzanie elementow DOM
const domElements = DOM();

//Inicjalizacja objektu, ktory odpowiada za widok notatki
const noteView = NoteView();

//Inicjalizacja objektu, ktory odpowiada za dodawanie nowej notatki
const addNoteForm = AddForm();

//Inicjalizacja objektu, ktory odpowiada za edytowanie istniejacej notatki
const editNoteForm = EditForm();

domElements.setNoteDOMElementGenerator(noteView.generateNoteElement);
domElements.setAllNotesGetter(noteStorage.getNotesFromStorage);
domElements.setAddNoteHandler(addNoteForm.showAddNoteForm);

noteView.setEditHandler(editNoteForm.showEditNoteForm);
noteView.setUpdateNoteHandler(noteStorage.updateNote);
noteView.setDeleteHandler(noteStorage.deleteNote);
noteView.setAllNotesGetter(noteStorage.getNotesFromStorage);
noteView.setDOMRender(domElements.renderNotes);

addNoteForm.setActionsFormOpening(domElements.onFormOpening);
addNoteForm.setActionsFormClosing(domElements.onFormClosing);
addNoteForm.setDOMRender(domElements.renderNotes);
addNoteForm.setStoreNoteHandler(noteStorage.addNote);

editNoteForm.setActionsFormOpening(domElements.onFormOpening);
editNoteForm.setActionsFormClosing(domElements.onFormClosing);
editNoteForm.setDOMRender(domElements.renderNotes);
editNoteForm.setUpdateNoteHandler(noteStorage.updateNote);
editNoteForm.setAllNotesGetter(noteStorage.getNotesFromStorage);

domElements.renderNotes();