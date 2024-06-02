import React, { useState, useEffect } from 'react';
import NoteSvg from './NoteSvg';
import NoteModal from './modal/NoteModal';
import { loadPinnedNotes } from '../../utils/noteUtils';
import { NoteType } from '../../types/types';

const PinnedNotesList: React.FC = () => {
    const [pinnedNotes, setPinnedNotes] = useState<NoteType[]>([]);
    const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);

    useEffect(() => {
        const handleStorageEvent = () => {
            setPinnedNotes(loadPinnedNotes());
        };

        handleStorageEvent();
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

    const openNoteDetail = (note: NoteType) => {
        setSelectedNote(note);
    };

    const closeModal = () => {
        setSelectedNote(null);
    };

    const handleUpdateNote = (updatedNote: NoteType) => {
        setPinnedNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === updatedNote.id ? updatedNote : note
            )
        );
        setSelectedNote(updatedNote);
    };

    return (
        <div className="flex-1 p-4 rounded-lg shadow-md m-2 flex flex-col box-border overflow-hidden">
            <h2 className="text-2xl font-bold mb-4">Pinned Notes</h2>
            <div className="flex-1 overflow-y-auto flex flex-row space-x-4 items-start">
                {pinnedNotes.map((note) => (
                    <div
                        key={note.id}
                        className="flex flex-col items-center"
                        onClick={() => openNoteDetail(note)}
                    >
                        <NoteSvg />
                        <p className="mt-2 mb-2 text-center">{note.title}</p>
                    </div>
                ))}
            </div>

            {selectedNote && (
                <NoteModal
                    note={selectedNote}
                    onClose={closeModal}
                    onUpdate={handleUpdateNote}
                />
            )}
        </div>
    );
};

export default PinnedNotesList;
