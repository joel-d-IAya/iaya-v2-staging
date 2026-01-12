import React from 'react';
import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import PulseGrid from '../components/PulseGrid';
import RecreoSection from '../components/RecreoSection';
import PortfolioGrid from '../components/PortfolioGrid';

import AboutSection from '../components/AboutSection';
import NexoForm from '../components/NexoForm';

interface HomePageProps {
    activeLang: string;
}

const HomePage: React.FC<HomePageProps> = ({ activeLang }) => {
    return (
        <>
            <Hero locale={activeLang} />
            <ServicesGrid locale={activeLang} />
            <PortfolioGrid locale={activeLang} />
            <PulseGrid locale={activeLang} />
            <RecreoSection locale={activeLang} />
            <AboutSection locale={activeLang} />
            <NexoForm locale={activeLang} />
        </>
    );
};

export default HomePage;
