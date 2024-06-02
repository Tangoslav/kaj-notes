import React, { useState, useEffect } from 'react';

const StatusBar: React.FC = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <div
            className={`p-2 text-center ${isOnline ? 'bg-green-500' : 'bg-red-500'} text-white`}
        >
            {isOnline ? 'Online' : 'Offline'}
        </div>
    );
};

export default StatusBar;
