// Funkcja zwraca objekt ktory odpowiada za pobieranie i przetwarzanie elementow DOM
const DOM = () => {
    const createNoteBtn = document.querySelector('.createIconNote');
    const blur = document.querySelector('.page');
    const notesList = document.querySelector('.notesList');
    const searchInput = document.querySelector('.searchInput');

    let noteDOMElementGenerator;
    let getAllNotes;
    let addNoteHandler;

    const setNoteDOMElementGenerator = (functionToSet) => {
        noteDOMElementGenerator = functionToSet;
    };

    const setAllNotesGetter = (functionToSet) => {
        getAllNotes = functionToSet;
    };

    const setAddNoteHandler = (functionToSet) => {
        addNoteHandler = functionToSet;
    };

    const onFormOpening = () => {
        blur.classList.add('pageBlur');
    };

    const onFormClosing = () => {
        blur.classList.remove('pageBlur');
    };

    // Funkcja renderuje wszystkie notatki w DOM strukturze stronki
    const renderNotes = () => {
        const filterByTitle = searchInput.value.toLowerCase();
        const allNotes = getAllNotes().filter(note => note.title.toLowerCase().includes(filterByTitle));
        const pinnedNotes = allNotes.filter(note => note.pinned === true);
        const unPinnedNotes = allNotes.filter(note => note.pinned === false);

        //Wyczyszczamy wszystkie istniejace DOM elementy (notatki)
        notesList.innerHTML = "";

        //Najpierw sie renderuja notatki podpiete
        pinnedNotes.forEach(note => {
            insertNoteToDOM(note);
        });

        //Dalej sie renderuja notatki zwykle
        unPinnedNotes.forEach(note => {
            insertNoteToDOM(note);
        });
    };



    // Funkcja obsluguje dodawanie elementu do DOM struktury strony
    const insertNoteToDOM = (note) => {
        const noteElement = noteDOMElementGenerator(note);
        notesList.appendChild(noteElement);
    };

    // Dodawanie nasluchiwania na input wyszukiwania notatek wedlug tytulu
    searchInput.addEventListener('input', () => renderNotes());

    // Dodawanie nasluchiwania na przycisk tworzenia nowej notatki
    createNoteBtn.addEventListener('click', () => addNoteHandler());

    return {
        onFormOpening,
        onFormClosing,
        setNoteDOMElementGenerator,
        setAllNotesGetter,
        setAddNoteHandler,
        renderNotes
    }
};