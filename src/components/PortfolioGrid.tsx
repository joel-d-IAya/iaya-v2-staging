import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchPortfolio, type PortfolioItem } from '../services/api';
import PortfolioCard from './PortfolioCard';

const TEXTS: Record<string, { title: string, subtitle: string, cta: string, badge: string }> = {
    ES: {
        title: 'Casos de Éxito',
        subtitle: 'Transformando visiones en realidades tangibles a través de la IA.',
        cta: 'Explorar todo el Portafolio',
        badge: 'Portfolio'
    },
    EN: {
        title: 'Success Stories',
        subtitle: 'Transforming visions into tangible realities through AI.',
        cta: 'Explore full Portfolio',
        badge: 'Portfolio'
    },
    FR: {
        title: 'Cas de Réussite',
        subtitle: 'Transformer les visions en réalités tangibles grâce à l\'IA.',
        cta: 'Explorer tout le Portfolio',
        badge: 'Portfolio'
    }
};

// Safe mapping for Tailwind grid spans as per Directus audit
const GRID_MAP: Record<string, string> = {
    'col-span-12': 'md:col-span-12',
    'col-span-8': 'md:col-span-8',
    'col-span-6': 'md:col-span-6',
    'col-span-4': 'md:col-span-4',
    'col-span-3': 'md:col-span-3',
};

export default function PortfolioGrid({ locale }: { locale: string }) {
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const t = TEXTS[locale] || TEXTS.ES;

    useEffect(() => {
        fetchPortfolio().then(data => {
            setPortfolio(data);
            setLoading(false);
        });
    }, []);

    // Skeleton loader
    if (loading && portfolio.length === 0) return (
        <section id="portfolio" className="py-32 bg-iaya-bg">
            <div className="max-w-7xl mx-auto px-8">
                <div className="h-96 rounded-[40px] bg-white/5 animate-pulse flex items-center justify-center">
                    <span className="font-outfit font-black italic text-2xl text-white/10 tracking-widest uppercase">IAya Portfolio...</span>
                </div>
            </div>
        </section>
    );

    if (portfolio.length === 0) return null;

    return (
        <section id="portfolio" className="py-32 bg-iaya-bg relative overflow-hidden">
            {/* Background elements for depth */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-iaya-turquoise/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-8 relative z-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="w-12 h-[1px] bg-iaya-turquoise shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                            <span className="text-iaya-turquoise font-outfit font-bold uppercase tracking-[0.4em] text-xs">
                                {t.badge}
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl sm:text-7xl lg:text-8xl font-outfit font-bold text-white tracking-tighter mb-8 bg-gradient-to-br from-white via-white to-white/30 bg-clip-text text-transparent"
                        >
                            {t.title}
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-white/40 font-inter text-lg sm:text-xl leading-relaxed max-w-xl"
                        >
                            {t.subtitle}
                        </motion.p>
                    </div>

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        viewport={{ once: true }}
                        onClick={() => window.location.href = '/portafolio'}
                        className="group relative px-10 py-5 bg-white/5 border border-white/10 rounded-full overflow-hidden transition-all duration-500 hover:border-iaya-turquoise/40 shadow-xl"
                    >
                        <div className="absolute inset-0 bg-iaya-turquoise/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10 font-outfit font-bold text-xs uppercase tracking-[0.2em] text-white flex items-center gap-3">
                            {t.cta}
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </motion.button>
                </div>

                {/* Bento Grid Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                    {portfolio.map((item, index) => {
                        // Map internal tailwind_class string to responsive tailwind classes
                        const spanClass = GRID_MAP[item.home_size?.tailwind_class || ''] || "md:col-span-4";
                        return (
                            <div key={item.id} className={`${spanClass} flex flex-col`}>
                                <PortfolioCard
                                    item={item}
                                    locale={locale}
                                    index={index}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Vertical Separator */}
                <div className="mt-32 flex justify-center">
                    <div className="w-px h-32 bg-gradient-to-b from-iaya-turquoise/30 via-iaya-turquoise/5 to-transparent" />
                </div>
            </div>
        </section>
    );
}
