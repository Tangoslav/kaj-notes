export const loadPinnedNotes = () => {
    return JSON.parse(localStorage.getItem('pinnedNotes') || '[]');
};

export const togglePinNote = (note: {
    id: string;
    title: string;
    content: string;
    date: string;
    tags: string[];
}) => {
    const existingPinnedNotes = loadPinnedNotes();
    const noteIndex = existingPinnedNotes.findIndex(
        (n: { id: string }) => n.id === note.id
    );

    if (noteIndex !== -1) {
        // Unpin the note
        existingPinnedNotes.splice(noteIndex, 1);
    } else {
        // Pin the note
        existingPinnedNotes.push(note);
    }

    localStorage.setItem('pinnedNotes', JSON.stringify(existingPinnedNotes));
    window.dispatchEvent(new Event('localStorageNoteAdded'));
};

export const isNotePinned = (note: {
    id: string;
    title: string;
    content: string;
    date: string;
    tags: string[];
}) => {
    const existingPinnedNotes = loadPinnedNotes();
    return existingPinnedNotes.some((n: { id: string }) => n.id === note.id);
};

export const deleteNote = (note: {
    id: string;
    title: string;
    content: string;
    date: string;
    tags: string[];
}) => {
    const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = existingNotes.filter(
        (n: { id: string }) => n.id !== note.id
    );
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    // Remove the note from pinned notes as well
    const existingPinnedNotes = loadPinnedNotes();
    const updatedPinnedNotes = existingPinnedNotes.filter(
        (n: { id: string }) => n.id !== note.id
    );
    localStorage.setItem('pinnedNotes', JSON.stringify(updatedPinnedNotes));

    window.dispatchEvent(new Event('localStorageNoteAdded'));
    window.dispatchEvent(new Event('localStorageNoteDeleted'));
};

export const updateNote = (
    oldNote: {
        id: string;
        title: string;
        content: string;
        date: string;
        tags: string[];
    },
    newNote: {
        id: string;
        title: string;
        content: string;
        date: string;
        tags: string[];
    }
) => {
    // Update note in the main notes list
    const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    const updatedNotes = existingNotes.map((n: { id: string }) =>
        n.id === oldNote.id ? newNote : n
    );
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    // Update note in the pinned notes list if it exists
    const existingPinnedNotes = JSON.parse(
        localStorage.getItem('pinnedNotes') || '[]'
    );
    const updatedPinnedNotes = existingPinnedNotes.map((n: { id: string }) =>
        n.id === oldNote.id ? newNote : n
    );
    localStorage.setItem('pinnedNotes', JSON.stringify(updatedPinnedNotes));

    window.dispatchEvent(new Event('localStorageNoteUpdated'));
};

export const createNote = (title: string, content: string, tags: string[]) => {
    const newNote = {
        id: crypto.randomUUID(),
        title,
        content,
        date: new Date().toISOString(),
        tags,
        location:
            localStorage.getItem('userLocation') || 'Location not available',
    };
    const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');
    existingNotes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(existingNotes));
    window.dispatchEvent(new Event('localStorageNoteAdded'));
    return newNote;
};
