import React from 'react';
import Header from '../components/homepage/Header';
import WelcomeSection from '../components/homepage/WelcomeSection';
import QuickAccess from '../components/homepage/QuickAccess';
import Stats from '../components/homepage/Stats';

const HomePage: React.FC = () => {
    return (
        <div className="h-full flex flex-col items-center p-6 overflow-y-auto">
            <header>
                <Header />
            </header>
            <main className="w-full max-w-4xl mx-auto flex flex-col items-center flex-1">
                <WelcomeSection />
                <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <QuickAccess />
                    <Stats />
                </section>
            </main>
        </div>
    );
};

export default HomePage;
