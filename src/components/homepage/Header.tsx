import React from 'react';
import Logo from '../../assets/images/logo.svg';

const Header: React.FC = () => {
    return (
        <header className="w-full max-w-4xl mx-auto text-center py-12">
            <img src={Logo} alt="logo" className="w-20 h-20 mx-auto" />
            <h1 className="text-4xl font-bold text-gray-900 mt-4">
                My Notes App
            </h1>
            <p className="text-lg text-gray-700 mt-2">
                Keep all your notes organized and accessible.
            </p>
        </header>
    );
};

export default Header;
