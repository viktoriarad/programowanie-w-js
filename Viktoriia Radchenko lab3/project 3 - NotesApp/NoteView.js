const NoteView = () => {
    // Prywatne zmiennie sluzace dla przechowywania funkcji-obsligiwacze do ikonek (edit, delete, pin)
    let deleteHandler;
    let editHandler;
    let updateNote;
    let getAllNotes;
    let renderDOM;

    // Funkcja prywatna dla sprawdzania czy podany parametr jest funkcja
    const isFunction = (functionToCheck) => {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    };
    // Funkcja publiczna ustawia obslugiwacz dla pin icon
    const setUpdateNoteHandler = (functionToSet) => {
        updateNote = functionToSet;
    };

    // Funkcja publiczna ustawia obslugiwacz dla delete icon
    const setDeleteHandler = (functionToSet) => {
        if (isFunction(functionToSet)) {
            deleteHandler = functionToSet;
            return true;
        } else {
            return false;
        }
    };

    // Funkcja publiczna ustawia obslugiwacz dla edit icon
    const setEditHandler = (functionToSet) => {
        if (isFunction(functionToSet)) {
            editHandler = functionToSet;
            return true;
        } else {
            return false;
        }
    };

    const setAllNotesGetter = (functionToSet) => {
        getAllNotes = functionToSet;
    };

    const setDOMRender = (functionToSet) => {
        renderDOM = functionToSet;
    };

    // Funkcja prywatna tworzy i zwraca DOM element ikonki podpiecia notatki
    const createPinIconElement = (note) => {
        const pinIconElement = document.createElement('i');
        pinIconElement.classList.add('fas');
        pinIconElement.classList.add('fa-thumbtack');
        pinIconElement.classList.add('pin-icon');

        if (note.pinned === true) {
            pinIconElement.classList.add('pin-icon-active');
        }

        pinIconElement.addEventListener('click', () => {
            note.pinned = !note.pinned;
            updateNote(note);
            renderDOM();
        });

        return pinIconElement;
    };

    // Funkcja prywatna tworzy i zwraca DOM element ikonki usuniecia notatki
    const createDeleteIconElement = (noteId) => {
        const deleteIconElement = document.createElement('i');
        deleteIconElement.classList.add('fas');
        deleteIconElement.classList.add('fa-trash');
        deleteIconElement.classList.add('delete-icon');

        deleteIconElement.addEventListener('click', () => {
            deleteHandler(noteId);
            renderDOM();
        });

        return deleteIconElement;
    };

    // Funkcja prywatna tworzy i zwraca DOM element ikonki edytowania notatki
    const createEditIconElement = (noteId) => {
        const editIconElement = document.createElement('i');
        const noteArray = getAllNotes();
        editIconElement.classList.add('fas');
        editIconElement.classList.add('fa-pen');
        editIconElement.classList.add('edit-icon');

        editIconElement.addEventListener('click', () => {
            const editedNote = noteArray.find(el => el.id === noteId);
            editHandler(editedNote);
        });

        return editIconElement;
    };


    // Funkcja publiczna tworzy i zwraca DOM element calej notatki
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
    };

    return {
        setUpdateNoteHandler,
        setDeleteHandler,
        setEditHandler,
        setAllNotesGetter,
        setDOMRender,
        generateNoteElement
    }
};