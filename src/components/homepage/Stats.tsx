import React, { useState, useEffect } from 'react';

const Stats: React.FC = () => {
    const [totalNotes, setTotalNotes] = useState(0);
    const [pinnedNotes, setPinnedNotes] = useState(0);
    const [recentNotes, setRecentNotes] = useState(0);

    const updateStats = () => {
        const storedNotes = JSON.parse(localStorage.getItem('notes') || '[]');
        const storedPinnedNotes = JSON.parse(
            localStorage.getItem('pinnedNotes') || '[]'
        );
        setTotalNotes(storedNotes.length);
        setPinnedNotes(storedPinnedNotes.length);
        setRecentNotes(
            storedNotes.filter((note: any) => {
                const noteDate = new Date(note.date);
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                return noteDate > oneWeekAgo;
            }).length
        );
    };

    useEffect(() => {
        updateStats();
        const handleStorageEvent = () => {
            updateStats();
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

    return (
        <div
            className="p-6 rounded-lg shadow-md"
            style={{ backgroundColor: '#4381C1' }}
        >
            <h3 className="text-xl font-bold text-white">Stats</h3>
            <ul className="mt-4 space-y-2">
                <li className="text-white">Total Notes: {totalNotes}</li>
                <li className="text-white">Pinned Notes: {pinnedNotes}</li>
                <li className="text-white">Recent Notes: {recentNotes}</li>
            </ul>
        </div>
    );
};

export default Stats;
