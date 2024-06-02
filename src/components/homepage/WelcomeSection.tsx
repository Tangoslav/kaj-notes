import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeSection: React.FC = () => {
    return (
        <section className="w-full text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome to My Notes App!
            </h2>
            <p className="text-gray-600 mb-6">
                Easily create, view, and manage your notes.
            </p>
            <div className="flex space-x-4 justify-center">
                <Link
                    to="/notes"
                    className="px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity duration-200"
                    style={{ backgroundColor: '#F92A82' }}
                >
                    Create New Note
                </Link>
            </div>
        </section>
    );
};

export default WelcomeSection;
