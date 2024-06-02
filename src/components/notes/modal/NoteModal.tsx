import React, { useState, useContext } from 'react';
import { NoteType } from '../../../types/types';
import {
    togglePinNote,
    updateNote,
    deleteNote,
    isNotePinned,
} from '../../../utils/noteUtils';
import { formatDate } from '../../../utils/dateUtils';
import { playSound } from '../../../utils/soundUtils';
import pinNoteSound from '../../../assets/sounds/notePinSound.wav';
import { ModalContext } from '../../../context/ModalContext';
import EditNoteForm from './EditNoteForm';
import ConfirmationDialog from './ConfirmationDialog';
import '../../../assets/styles/noteModal.css'; // Ensure this path is correct

interface NoteModalProps {
    note: NoteType;
    onClose: () => void;
    onUpdate: (updatedNote: NoteType) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ note, onClose, onUpdate }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const context = useContext(ModalContext);

    if (!context) {
        return null;
    }

    const handlePin = () => {
        togglePinNote(note);
        playSound(pinNoteSound);
        onClose();
    };

    const handleSaveEdit = (
        editedTitle: string,
        editedContent: string,
        editedTags: string[]
    ) => {
        const updatedNote = {
            ...note,
            title: editedTitle,
            content: editedContent,
            tags: editedTags,
        };
        updateNote(note, updatedNote);
        onUpdate(updatedNote);
        setIsEditMode(false);
        onClose();
    };

    const handleDelete = () => {
        deleteNote(note);
        onClose();
    };

    const isPinned = isNotePinned(note);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={`modal modal-enter`} onClick={handleBackdropClick}>
            <div className="modal-content w-11/12 md:w-2/3 lg:w-1/2 max-w-4xl">
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 float-right"
                >
                    &times;
                </button>
                {isEditMode ? (
                    <EditNoteForm
                        note={note}
                        onSave={handleSaveEdit}
                        onCancel={() => setIsEditMode(false)}
                    />
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            {note.title}
                        </h2>
                        <div className="flex flex-wrap mb-4">
                            {note.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p className="mb-4">{note.content}</p>
                        <p className="text-gray-500 text-sm">
                            {formatDate(note.date)}
                        </p>
                        {note.location && (
                            <p className="text-gray-500 text-sm mt-2">
                                Location: {note.location}
                            </p>
                        )}
                        <div className="mt-4 flex justify-between">
                            <div>
                                <button
                                    onClick={handlePin}
                                    className={`py-2 px-4 rounded mr-2 ${isPinned ? 'border border-red-500 text-red-500' : 'bg-blue-500 text-white'}`}
                                >
                                    {isPinned ? 'Unpin Note' : 'Pin Note'}
                                </button>
                                <button
                                    onClick={() => setIsEditMode(true)}
                                    className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                                >
                                    Edit Note
                                </button>
                            </div>
                            <button
                                onClick={() => setShowConfirmation(true)}
                                className="bg-red-500 text-white py-2 px-4 rounded"
                            >
                                Delete Note
                            </button>
                        </div>
                    </div>
                )}
                {showConfirmation && (
                    <ConfirmationDialog
                        message="Are you sure you want to delete this note?"
                        onConfirm={handleDelete}
                        onCancel={() => setShowConfirmation(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default NoteModal;
