import React, { useState } from 'react';
import { NoteType } from '../../../types/types';

interface EditNoteFormProps {
    note: NoteType;
    onSave: (title: string, content: string, tags: string[]) => void;
    onCancel: () => void;
}

const EditNoteForm: React.FC<EditNoteFormProps> = ({
    note,
    onSave,
    onCancel,
}) => {
    const [editedTitle, setEditedTitle] = useState(note.title);
    const [editedContent, setEditedContent] = useState(note.content);
    const [editedTags, setEditedTags] = useState(note.tags.join(', '));

    const handleSave = () => {
        const newTags = editedTags.split(',').map((tag) => tag.trim());
        onSave(editedTitle, editedContent, newTags);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Edit Note</h2>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                >
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="content"
                >
                    Content
                </label>
                <textarea
                    id="content"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    rows={5}
                    required
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="tags"
                >
                    Tags (comma separated)
                </label>
                <input
                    type="text"
                    id="tags"
                    value={editedTags}
                    onChange={(e) => setEditedTags(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button
                onClick={handleSave}
                className="bg-green-500 text-white py-2 px-4 rounded mr-2"
            >
                Save
            </button>
            <button
                onClick={onCancel}
                className="bg-gray-500 text-white py-2 px-4 rounded"
            >
                Cancel
            </button>
        </div>
    );
};

export default EditNoteForm;
