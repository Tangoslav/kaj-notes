import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NoteListsPage from './pages/NoteListsPage';
import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';
import NavBar from './components/common/NavBar';
import { ModalProvider } from './context/ModalContext';

function App() {
    return (
        <ModalProvider>
            <div className="App h-screen flex flex-col">
                <NavBar />
                <div className="flex-1 overflow-auto">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/notes" element={<NoteListsPage />} />
                        <Route path="/account" element={<AccountPage />} />
                    </Routes>
                </div>
            </div>
        </ModalProvider>
    );
}

export default App;
