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
        </>
    );
};

export default HomePage;
