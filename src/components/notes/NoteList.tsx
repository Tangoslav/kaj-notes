import React, { useState, useEffect } from 'react';
import Note from './Note';
import { NoteType } from '../../types/types';
import '../../assets/styles/notes.css'; // Ensure this path is correct

const NoteList: React.FC = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [filterTag, setFilterTag] = useState('');

    const loadNotesFromLocalStorage = () => {
        const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
        setNotes(storedNotes);
    };

    useEffect(() => {
        loadNotesFromLocalStorage();
        const handleStorageEvent = () => {
            console.log('localStorage event triggered'); // Debug statement
            loadNotesFromLocalStorage();
        };
        window.addEventListener('localStorageNoteAdded', handleStorageEvent);
        window.addEventListener('localStorageNoteDeleted', handleStorageEvent);
        window.addEventListener('localStorageNoteUpdated', handleStorageEvent);

        return () => {
            window.removeEventListener(
                'localStorageNoteAdded',
                handleStorageEvent
            );
            window.removeEventListener(
                'localStorageNoteDeleted',
                handleStorageEvent
            );
            window.removeEventListener(
                'localStorageNoteUpdated',
                handleStorageEvent
            );
        };
    }, []);

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterTag(event.target.value);
    };

    const handleTagClick = (tag: string) => {
        setFilterTag(tag);
    };

    const clearFilter = () => {
        setFilterTag('');
    };

    const filteredNotes = notes
        .filter((note) => filterTag === '' || note.tags.includes(filterTag))
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ); // Sort by newest first

    return (
        <div className="h-full overflow-clip p-4">
            <div className="mb-4 w-full relative">
                <input
                    type="text"
                    value={filterTag}
                    onChange={handleFilterChange}
                    placeholder="Filter by tag"
                    className="w-full p-2 border rounded filter-input"
                />
                {filterTag && (
                    <button
                        onClick={clearFilter}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 clear-button"
                    >
                        &times;
                    </button>
                )}
            </div>
            <section className="note-list w-full h-full overflow-y-auto flex flex-col items-center pt-4 rounded-lg">
                {filteredNotes.map((note) => (
                    <Note key={note.id} {...note} onTagClick={handleTagClick} />
                ))}
            </section>
        </div>
    );
};

export default NoteList;
