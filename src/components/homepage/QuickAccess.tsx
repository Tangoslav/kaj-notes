import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/QuickAccess.css';

const QuickAccess: React.FC = () => {
    return (
        <div
            className="p-6 rounded-lg shadow-md"
            style={{ backgroundColor: '#4381C1' }}
        >
            <h3 className="text-xl font-bold text-white">Quick Access</h3>
            <ul className="mt-4 space-y-2">
                <li>
                    <Link to="/notes" className="animated-underline text-white">
                        All Notes
                    </Link>
                </li>
                <li>
                    <Link
                        to="https://www.linkedin.com/in/tobias-le/"
                        className="animated-underline text-white"
                    >
                        Author's LinkedIn
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default QuickAccess;
