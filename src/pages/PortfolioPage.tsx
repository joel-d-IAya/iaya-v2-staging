import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchAllPortfolio, type PortfolioItem } from '../services/api';
import PortfolioCard from '../components/PortfolioCard';

const TEXTS: Record<string, { title: string, subtitle: string, badge: string }> = {
    ES: {
        title: 'Portafolio Completo',
        subtitle: 'Explora nuestra galería completa de innovaciones y soluciones disruptivas impulsadas por Inteligencia Artificial.',
        badge: 'Portfolio'
    },
    EN: {
        title: 'Full Portfolio',
        subtitle: 'Explore our complete gallery of innovations and disruptive solutions powered by Artificial Intelligence.',
        badge: 'Portfolio'
    },
    FR: {
        title: 'Portfolio Complet',
        subtitle: 'Explorez notre galerie complète d\'innovations et de solutions disruptives propulsées par l\'Intelligence Artificielle.',
        badge: 'Portfolio'
    }
};

const GRID_MAP: Record<string, string> = {
    'col-span-12': 'md:col-span-12',
    'col-span-8': 'md:col-span-8',
    'col-span-6': 'md:col-span-6',
    'col-span-4': 'md:col-span-4',
    'col-span-3': 'md:col-span-3',
};

export default function PortfolioPage({ activeLang }: { activeLang: string }) {
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const t = TEXTS[activeLang] || TEXTS.ES;

    useEffect(() => {
        fetchAllPortfolio().then(data => {
            setPortfolio(data);
            setLoading(false);
        });
        window.scrollTo(0, 0);
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-iaya-bg flex items-center justify-center">
            <div className="animate-pulse text-2xl font-black italic text-white font-outfit uppercase tracking-widest">IAya Portfolio...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-iaya-bg pt-40 pb-32 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-iaya-turquoise/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-8 relative z-10">

                {/* Header */}
                <div className="max-w-3xl mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        <div className="w-12 h-[1px] bg-iaya-turquoise shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                        <span className="text-iaya-turquoise font-outfit font-bold uppercase tracking-[0.4em] text-xs">
                            {t.badge}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl sm:text-8xl font-outfit font-bold text-white tracking-tighter mb-8 bg-gradient-to-br from-white via-white to-white/30 bg-clip-text text-transparent"
                    >
                        {t.title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/40 font-inter text-xl sm:text-2xl leading-relaxed"
                    >
                        {t.subtitle}
                    </motion.p>
                </div>

                {/* Bento Grid Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                    {portfolio.map((item, index) => {
                        const spanClass = GRID_MAP[item.home_size?.tailwind_class || ''] || "md:col-span-4";
                        return (
                            <div key={item.id} className={`${spanClass} flex flex-col`}>
                                <PortfolioCard
                                    item={item}
                                    locale={activeLang}
                                    index={index}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Vertical Separator */}
                <div className="mt-40 flex justify-center">
                    <div className="w-px h-32 bg-gradient-to-b from-iaya-orange/30 via-iaya-orange/5 to-transparent" />
                </div>
            </div>
        </div>
    );
}
