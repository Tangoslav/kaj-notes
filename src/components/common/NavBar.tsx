import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/logo.svg';
import '../../assets/styles/navbar.css';

const NavBar = () => {
    const location = useLocation();
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const links = document.querySelectorAll('.navbar-link');
        links.forEach((link) => {
            if (link.getAttribute('href') === location.pathname) {
                link.classList.add('current-navbar-link');
            } else {
                link.classList.remove('current-navbar-link');
            }
        });

        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [location]);

    return (
        <nav className="nav-bar w-full h-20 bg-blue-300 flex items-center justify-between px-5 rounded-3xl mb-10 md:mx-5">
            <div className="flex items-center">
                <Link to={'/'} className={'navbar-link'}>
                    <img src={Logo} alt={'logo'} className={'w-14 h-14'} />
                </Link>
                <div
                    className={`ml-2 w-4 h-4 rounded-full ${
                        isOnline ? 'bg-green-500' : 'bg-red-500'
                    }`}
                />
            </div>
            <div className={'flex items-center space-x-4 md:space-x-8'}>
                <Link to={'/notes'} className={'navbar-link'}>
                    Notes
                </Link>
                <Link to={'/account'} className={'navbar-link'}>
                    Account
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
