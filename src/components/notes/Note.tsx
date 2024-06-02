import React, { useState } from 'react';
import NoteModal from './modal/NoteModal';
import { isNotePinned } from '../../utils/noteUtils';
import { formatDate } from '../../utils/dateUtils';
import { useModal } from '../../hooks/useModal';

const MAX_CONTENT_LENGTH = 40;
const MAX_TITLE_LENGTH = 20;

const abbreviateContent = (content: string) => {
    if (content.length > MAX_CONTENT_LENGTH) {
        return content.substring(0, MAX_CONTENT_LENGTH) + '...';
    }
    return content;
};

const abbreviateTitle = (title: string) => {
    if (title.length > MAX_TITLE_LENGTH) {
        return title.substring(0, MAX_TITLE_LENGTH) + '...';
    }
    return title;
};

interface NoteProps {
    id: string;
    title: string;
    content: string;
    date: string;
    tags: string[];
    onTagClick: (tag: string) => void;
}

const Note: React.FC<NoteProps> = ({
    id,
    title,
    content,
    date,
    tags,
    onTagClick,
}) => {
    const { showModal, hideModal } = useModal();
    const [note, setNote] = useState({
        id,
        title,
        content,
        date,
        tags,
        location: '',
    });

    const handleNoteClick = () => {
        showModal(
            <NoteModal
                note={note}
                onClose={hideModal}
                onUpdate={(updatedNote) => setNote(updatedNote)} // Update the note state
            />
        );
    };

    const pinned = isNotePinned(note);

    return (
        <div className="w-full flex justify-center note shadow-md border-blue-200 border-2 rounded-xl p-4 m-2">
            <div
                className="relative cursor-pointer w-full"
                onClick={handleNoteClick}
            >
                {pinned && (
                    <span className="absolute top-2 right-2 text-red-500">
                        📍
                    </span>
                )}
                <h2 className="border-b border-blue-200 mb-3 mt-3 p-3 text-3xl text-gray-800">
                    {abbreviateTitle(note.title)}
                </h2>
                <p className="p-3 text-gray-700">
                    {abbreviateContent(note.content)}
                </p>
                <p className="date p-3 text-gray-500 text-sm">
                    {formatDate(note.date)}
                </p>
                <div className="flex flex-wrap mb-4">
                    {note.tags.map((tag) => (
                        <span
                            key={tag}
                            onClick={() => onTagClick(tag)}
                            className="tag bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Note;
