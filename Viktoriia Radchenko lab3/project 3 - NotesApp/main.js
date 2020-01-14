//Pobieranie DOM elementów
const createNoteBtn = document.querySelector('.createIconNote');
const blur = document.querySelector('.page');
const notesList = document.querySelector('.notesList');

const noteForm = document.querySelector('.noteForm');
const popupCreateNote = document.querySelector('.newNote');
const closeNoteBtn = document.querySelector('.closeIconCreateNote');
const newNoteTitle = document.getElementById('new-note-title');
const newNoteDescription = document.getElementById('new-note-description');
const newNotePinned = document.getElementById('new-note-pinned');
const newNoteAllColors = document.querySelectorAll('.new-note-color');

const editNoteForm = document.querySelector('.editNoteForm');
const popupEditNote = document.querySelector('.editNote');
const closeEditNoteBtn = document.querySelector('.closeIconEditNote');
const editNoteId = document.getElementById('edit-note-id');
const editNoteTitle = document.getElementById('edit-note-title');
const editNoteDescription = document.getElementById('edit-note-description');
const editNotePinned = document.getElementById('edit-note-pinned');
const editNoteAllColors = document.querySelectorAll('.edit-note-color');

const searchInput = document.querySelector('.searchInput');

// Funkcja ktora zwraca w postaci tablicy wszystkie notatki przechowywane w localStorage
const getNotesFromStorage = () => {
  return JSON.parse(localStorage.getItem('notes'));
}

// Funkcja jako parametr przyjmuje tablice ze wszystkimi notatkami i zapisuje to w postaci string w localStorage
const setNotesToStorage = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Sprawdzenie czy istnieja notatki w localStorage i przypisanie ich do tablicy noteArray
let noteArray = localStorage.getItem('notes') ? getNotesFromStorage() : [];
setNotesToStorage(noteArray);

// Funkcja obsluguje dodawanie elementu w DOM strukture strony
const insertNoteToDOM = (note) => {
  const noteElement = generateNoteElement(note);

  notesList.appendChild(noteElement);
}

// Funkcja tworzy i zwraca DOM element ikonki podpiecia notatki
const createPinIconElement = (note) => {
  const pinIconElement = document.createElement('i');
  pinIconElement.classList.add('fas');
  pinIconElement.classList.add('fa-thumbtack');
  pinIconElement.classList.add('pin-icon');

  if (note.pinned === true) {
    pinIconElement.classList.add('pin-icon-active');
  }

  pinIconElement.addEventListener('click', () => {
    changePinNoteValue(note.id);
    reRenderAllNotes();
  })

  return pinIconElement;
}

// Funkcja tworzy i zwraca DOM element ikonki usuniecia notatki
const createDeleteIconElement = (noteId) => {
  const deleteIconElement = document.createElement('i');
  deleteIconElement.classList.add('fas');
  deleteIconElement.classList.add('fa-trash');
  deleteIconElement.classList.add('delete-icon');

  deleteIconElement.addEventListener('click', () => {
    deleteNote(noteId);
    reRenderAllNotes();
  })

  return deleteIconElement;
}

// Funkcja tworzy i zwraca DOM element ikonki edytowania notatki
const createEditIconElement = (noteId) => {
  const editIconElement = document.createElement('i');
  editIconElement.classList.add('fas');
  editIconElement.classList.add('fa-pen');
  editIconElement.classList.add('edit-icon');

  editIconElement.addEventListener('click', () => {
    const editedNote = noteArray.find(el => el.id === noteId);

    editNoteTitle.value = editedNote.title;
    editNoteDescription.value = editedNote.description;
    editNotePinned.checked = editedNote.pinned;
    editNoteId.value = editedNote.id;

    if (editedNote.color) {
      const selectedColorElement = Array.from(editNoteAllColors).find(el => el.dataset.color === editedNote.color);
      selectedColorElement.classList.add('edit-note-color-selected');
    }

    popupEditNote.classList.add('editNoteActive');
    blur.classList.add('pageBlur');

  })

  return editIconElement;
}

// Funkcja tworzy i zwraca DOM element calej notatki
const generateNoteElement = (note) => {
  const element = document.createElement('li');
  const elementColor = note.color ? `note-color-${note.color}` : "";
  element.classList.add('note-block');
  if (elementColor) element.classList.add(elementColor);

  const title = document.createElement('div');
  title.classList.add('note-title');
  title.textContent = note.title;

  const pinIcon = createPinIconElement(note);
  const deleteIcon = createDeleteIconElement(note.id);
  const editIcon = createEditIconElement(note.id);

  title.appendChild(pinIcon);
  title.appendChild(editIcon);
  title.appendChild(deleteIcon);

  const description = document.createElement('div');
  description.classList.add('note-description');
  description.textContent = note.description;

  element.appendChild(title);
  element.appendChild(description);

  return element;
}

// Funkcja zmienia wlasciwosc pinned notatki (true lub false), czyli czy bedzie podpieta
const changePinNoteValue = (noteId) => {
  const note = noteArray.find(note => note.id === noteId);
  note.pinned = !note.pinned;
}

// Funkcja usuwa odpowiednia notatke, ID ktorej przekazemy do parametru
const deleteNote = (noteId) => {
  const noteIndex = noteArray.findIndex((note, index) => note.id === noteId);
  noteArray.splice(noteIndex, 1);
}

// Funkcja przerenderuje wszystkie notatki w DOM strukturze stronki
const reRenderAllNotes = () => {
  setNotesToStorage(noteArray);
  notesList.innerHTML = "";
  renderNotes();
}

// Funkcja renderuje wszystkie notatki w DOM strukturze stronki
const renderNotes = () => {
  const filterByTitle = searchInput.value.toLowerCase();
  const allNotes = getNotesFromStorage().filter(note => note.title.toLowerCase().includes(filterByTitle));;
  const pinnedNotes = allNotes.filter(note => note.pinned === true);
  const unPinnedNotes = allNotes.filter(note => note.pinned === false);

  pinnedNotes.forEach(note => {
    insertNoteToDOM(note);
  });

  unPinnedNotes.forEach(note => {
    insertNoteToDOM(note);
  });
}

// Funkcja wykasuje zaznoczony kolor w formie dodawania nowej notatki
const clearAllColorsAddForm = () => {
  newNoteAllColors.forEach(el => {
    el.classList.remove('new-note-color-selected');
  })
}

// Funkcja wykasuje zaznoczony kolor w formie edytowania istniejacej notatki
const clearAllColorsEditForm = () => {
  editNoteAllColors.forEach(el => {
    el.classList.remove('edit-note-color-selected');
  })
}

// Funkcja zwraca wybrany kolor istniejacej notatki w formie edytowania
const getSelectedColorEditForm = () => {
  const selectedColor = Array.from(editNoteAllColors).find(el => el.classList.contains('edit-note-color-selected'));

  return selectedColor ? selectedColor.dataset.color : "";
}

// Funkcja ktora odpowiada za dodanie notatki i zresetowanie formularza dodawania notatki do defaultowych wartosci
const addNewNote = (e) => {
  const nextNoteId = noteArray.length > 0 ? noteArray[noteArray.length - 1].id + 1 : 0;
  const selectedColor = Array.from(newNoteAllColors).find(el => el.classList.contains('new-note-color-selected'));

  const note = {
    id: nextNoteId,
    title: newNoteTitle.value,
    description: newNoteDescription.value,
    color: selectedColor ? selectedColor.dataset.color : "",
    pinned: newNotePinned.checked
  }

  e.preventDefault();
  noteArray.push(note);
  setNotesToStorage(noteArray);
  reRenderAllNotes();
  popupCreateNote.classList.remove('newNoteActive');
  blur.classList.remove('pageBlur');
  newNoteTitle.value = '';
  newNoteDescription.value = '';
  newNotePinned.checked = false;
  clearAllColorsAddForm();
}

// Funkcja odpowiada za zapisanie zedytowanej notatki
const saveEditedNote = (e) => {
  e.preventDefault();

  const noteToSaveId = parseInt(editNoteId.value);
  const noteToSave = noteArray.find(el => el.id === noteToSaveId);

  noteToSave.title = editNoteTitle.value;
  noteToSave.description = editNoteDescription.value;
  noteToSave.pinned = editNotePinned.checked;
  noteToSave.color = getSelectedColorEditForm();

  setNotesToStorage(noteArray);
  reRenderAllNotes();
  popupEditNote.classList.remove('editNoteActive');
  blur.classList.remove('pageBlur');
}

// Renderowanie istniejacych notatek podczas inicjalizacji strony
reRenderAllNotes();

// Dodawanie nasluchiwan na submit przyciski w formularzach dodawania i edytowania notatek
noteForm.addEventListener('submit', addNewNote);
editNoteForm.addEventListener('submit', saveEditedNote);

// Dodawanie nasluchiwania na przycisk tworzenia nowej notatki
createNoteBtn.addEventListener('click', () => {
  popupCreateNote.classList.add('newNoteActive');
  blur.classList.add('pageBlur');
})

// Dodawanie nasluchiwan klikniecia myszki na wszystkie kolory w formularzu dodawania notatki
newNoteAllColors.forEach(el => {
  el.addEventListener('click', (e) => {

    const wasAlreadySelected = e.target.classList.contains('new-note-color-selected')

    clearAllColorsAddForm();

    if (wasAlreadySelected) return;

    e.target.classList.add('new-note-color-selected');

  })
})

// Dodawanie nasluchiwan klikniecia myszki na wszystkie kolory w formularzu edytowania notatki
editNoteAllColors.forEach(el => {
  el.addEventListener('click', (e) => {

    const wasAlreadySelected = e.target.classList.contains('edit-note-color-selected')

    clearAllColorsEditForm();

    if (wasAlreadySelected) return;

    e.target.classList.add('edit-note-color-selected');

  })
})

// Dodawanie nasluchiwania na przycisk zamkniecia formularzu dodawania notatki
closeNoteBtn.addEventListener('click', () => {
  popupCreateNote.classList.remove('newNoteActive');
  blur.classList.remove('pageBlur');
})

// Dodawanie nasluchiwania na przycisk zamkniecia formularzu edytowania notatki
closeEditNoteBtn.addEventListener('click', () => {
  popupEditNote.classList.remove('editNoteActive');
  blur.classList.remove('pageBlur');
})

// Dodawanie nasluchiwania na input wyszukiwania notatek wedlug tytulu
searchInput.addEventListener('input', reRenderAllNotes);
