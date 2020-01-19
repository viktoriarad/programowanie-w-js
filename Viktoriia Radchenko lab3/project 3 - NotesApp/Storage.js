const Storage = (keyName) => {
    const noteKey = keyName;

    const addKeyToStorage = () => {
        if (localStorage.getItem(noteKey) === null) {
            setNotesToStorage([]);
            console.log(`Key {noteKey} was successfully initialized in localStorage`);
            return true
        } else {
            console.log(`Key {noteKey} in localStorage has been initialized already`);
            return false;
        }
    };

    // Funkcja zwraca w postaci tablicy wszystkie notatki ktore sa przechowywane do localStorage
    const getNotesFromStorage = () => {
        return JSON.parse(localStorage.getItem(noteKey)) || [];
    };

    // Funkcja jako parametr przyjmuje tablice ze wszystkimi notatkami i zapisuje to w postaci string do localStorage
    const setNotesToStorage = (array) => {
        localStorage.setItem(noteKey, JSON.stringify(array));
    };

    // Funkcja dodaje nowa notatke do localStorage
    const addNote = (note) => {
        const notesArray = getNotesFromStorage();

        note.id = getNextNoteId();
        notesArray.push(note);
        setNotesToStorage(notesArray);
    };

    // Funkcja zmienia wlasciwosc pinned notatki (true lub false), czyli czy bedzie podpieta
    const updateNote = (note) => {
        const noteArray = getNotesFromStorage(noteKey);
        const noteToUpdate = noteArray.find(el => el.id === note.id);

        if (!noteToUpdate) return false;

        noteToUpdate.title = note.title;
        noteToUpdate.description = note.description;
        noteToUpdate.pinned = note.pinned;
        noteToUpdate.color = note.color;

        setNotesToStorage(noteArray);
        return true;
    };

    // Funkcja publiczna, usuwa odpowiednia notatke, ID ktorej przekazemy do parametru
    const deleteNote = (noteId) => {
        const noteArray = getNotesFromStorage(noteKey);
        const noteIndex = noteArray.findIndex((note) => note.id === noteId);

        if (noteIndex === -1) return false;
        noteArray.splice(noteIndex, 1);

        setNotesToStorage(noteArray);
        return true;
    };

    const getNextNoteId = () => {
        const noteArray = getNotesFromStorage(noteKey);
        return noteArray.length > 0 ? noteArray[noteArray.length - 1].id + 1 : 0;
    };

    addKeyToStorage(noteKey);

    return {
        getNotesFromStorage,
        setNotesToStorage,
        addNote,
        updateNote,
        deleteNote
    }
};