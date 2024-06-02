import React, { useState, useEffect } from 'react';
import { NoteType } from '../types/types';

const AccountPage = () => {
    const [userStats, setUserStats] = useState({
        totalNotes: 0,
        pinnedNotes: 0,
        recentNotes: 0,
        mostFrequentTag: 'None',
    });

    useEffect(() => {
        const fetchStats = () => {
            const storedNotes = JSON.parse(
                localStorage.getItem('notes') || '[]'
            );
            const pinnedNotes = JSON.parse(
                localStorage.getItem('pinnedNotes') || '[]'
            );
            const recentNotesCount = storedNotes.filter((note: NoteType) => {
                const noteDate = new Date(note.date);
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                return noteDate > oneWeekAgo;
            }).length;

            const tagCounts: { [key: string]: number } = {};
            storedNotes.forEach((note: NoteType) => {
                note.tags.forEach((tag: string) => {
                    if (tagCounts[tag]) {
                        tagCounts[tag]++;
                    } else {
                        tagCounts[tag] = 1;
                    }
                });
            });

            const mostFrequentTag = Object.keys(tagCounts).reduce(
                (a, b) => (tagCounts[a] > tagCounts[b] ? a : b),
                'None'
            );

            setUserStats({
                totalNotes: storedNotes.length,
                pinnedNotes: pinnedNotes.length,
                recentNotes: recentNotesCount,
                mostFrequentTag:
                    mostFrequentTag !== 'None' ? mostFrequentTag : 'None',
            });
        };

        fetchStats();
        window.addEventListener('localStorageNoteAdded', fetchStats);
        window.addEventListener('localStorageNoteDeleted', fetchStats);

        return () => {
            window.removeEventListener('localStorageNoteAdded', fetchStats);
            window.removeEventListener('localStorageNoteDeleted', fetchStats);
        };
    }, []);

    return (
        <div className="p-6 max-h-full flex flex-col items-center">
            <header>
                <h1 className="text-4xl font-bold mb-8">Account</h1>
            </header>
            <main className="w-full max-w-4xl">
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-blue-200 p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold">Total Notes</h2>
                        <p className="text-4xl">{userStats.totalNotes}</p>
                    </div>
                    <div className="bg-blue-300 p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold">Pinned Notes</h2>
                        <p className="text-4xl">{userStats.pinnedNotes}</p>
                    </div>
                    <div className="bg-blue-400 p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold">Recent Notes</h2>
                        <p className="text-4xl">{userStats.recentNotes}</p>
                    </div>
                    <div className="bg-blue-500 p-4 rounded-lg shadow-md col-span-full">
                        <h2 className="text-2xl font-semibold">
                            Most Frequent Tag
                        </h2>
                        <p className="text-4xl">{userStats.mostFrequentTag}</p>
                    </div>
                </section>
                <section className="w-full bg-white p-6 rounded-lg shadow-md mb-12">
                    <h2 className="text-3xl font-semibold mb-4">
                        Recent Activity
                    </h2>
                    <ul className="list-disc list-inside">
                        {userStats.totalNotes > 0 ? (
                            <>
                                <li>
                                    You have {userStats.totalNotes} total notes.
                                </li>
                                <li>
                                    You have {userStats.pinnedNotes} pinned
                                    notes.
                                </li>
                                <li>
                                    You have {userStats.recentNotes} notes from
                                    the last week.
                                </li>
                            </>
                        ) : (
                            <p>No recent activity found.</p>
                        )}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default AccountPage;
