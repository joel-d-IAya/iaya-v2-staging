import React from 'react';
import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import PulseGrid from '../components/PulseGrid';
import RecreoSection from '../components/RecreoSection';
import PortfolioGrid from '../components/PortfolioGrid';

interface HomePageProps {
    activeLang: string;
}

const HomePage: React.FC<HomePageProps> = ({ activeLang }) => {
    return (
        <>
            <Hero locale={activeLang} />
            <ServicesGrid locale={activeLang} />
            <PulseGrid locale={activeLang} />
            <RecreoSection locale={activeLang} />
            <PortfolioGrid locale={activeLang} />

            {/* Placeholder for Contact / Qui sommes-nous */}
            <section id="contacto" className="py-24 bg-iaya-bg border-t border-white/5">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className="text-4xl font-outfit font-bold text-white mb-8 tracking-tighter">
                        ¿Hablamos? / <span className="text-iaya-turquoise">Contacto</span>
                    </h2>
                    <p className="text-white/40 font-inter text-lg">Próximamente estaremos integrando esta sección.</p>
                </div>
            </section>
        </>
    );
};

export default HomePage;
