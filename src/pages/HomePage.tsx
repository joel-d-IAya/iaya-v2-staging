import React from 'react';
import ServicesGrid from '../components/ServicesGrid';
import PulseGrid from '../components/PulseGrid';
import RecreoSection from '../components/RecreoSection';
import PortfolioGrid from '../components/PortfolioGrid';

interface HomePageProps {
    activeLang: string;
}

const HomePage: React.FC<HomePageProps> = ({ activeLang }) => {
    return (
        <div className="bg-[#050505]">
            <header className="max-w-[1440px] mx-auto pt-48 pb-28 px-8 lg:px-24">
                <h1 className="text-[120px] md:text-[220px] font-black text-white italic tracking-tighter leading-none mb-8 opacity-95 uppercase">
                    IAya
                </h1>
                <div className="h-2 w-48 bg-blue-600 mb-10 rounded-full shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
                <p className="text-gray-400 text-3xl max-w-4xl font-medium leading-relaxed">
                    {activeLang === 'ES' ? 'Diseñamos el futuro de tu empresa con soluciones disruptivas en Inteligencia Artificial y Automatización.' :
                        activeLang === 'EN' ? 'We design your company\'s future with disruptive solutions in AI and Automation.' :
                            'Nous concevons le futur de votre entreprise avec des solutions disruptives en IA et Automatisation.'}
                </p>
            </header>

            <ServicesGrid locale={activeLang} />
            <PulseGrid locale={activeLang} />
            <RecreoSection locale={activeLang} />
            <PortfolioGrid locale={activeLang} />
        </div>
    );
};

export default HomePage;
