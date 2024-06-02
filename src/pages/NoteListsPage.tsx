import React from 'react';
import NoteList from '../components/notes/NoteList';
import PinnedNotesList from '../components/notes/PinnedNotesList';
import NewNoteForm from '../components/notes/NewNoteForm';
import '../assets/styles/notes.css';

const NoteListsPage: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row items-start overflow-hidden box-border min-h-screen">
            <aside className="w-full lg:w-1/3 h-full overflow-hidden order-1 lg:order-2">
                <section className="flex-1 mb-4 lg:mb-0">
                    <PinnedNotesList />
                </section>
                <section className="flex-1">
                    <NewNoteForm />
                </section>
            </aside>
            <section className="flex flex-col w-full lg:w-2/3 h-full overflow-hidden order-2 lg:order-1 shadow-md">
                <NoteList />
            </section>
        </div>
    );
};

export default NoteListsPage;
