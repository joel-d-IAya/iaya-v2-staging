import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchPortfolio, type PortfolioItem } from '../services/api';
import PortfolioCard from './PortfolioCard';
import SectionHeader from './SectionHeader';

const TEXTS: Record<string, { title: string, subtitle: string, cta: string, intro: string }> = {
    ES: {
        title: 'Portfolio de nuestros Casos de Éxito',
        subtitle: 'Transformando visiones en realidades tangibles a través de la IA.',
        cta: 'Explorar todo el Portafolio',
        intro: 'NUESTRAS REALIZACIONES'
    },
    EN: {
        title: 'Portfolio of our Success Stories',
        subtitle: 'Transforming visions into tangible realities through AI.',
        cta: 'Explore full Portfolio',
        intro: 'OUR ACHIEVEMENTS'
    },
    FR: {
        title: 'Portfolio de nos Cas de Réussite',
        subtitle: 'Transformer les visions en réalités tangibles grâce à l\'IA.',
        cta: 'Explorer tout le Portfolio',
        intro: 'NOS RÉALISATIONS'
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
        <section id="portfolio" className="py-32 bg-[oklch(0.13_0.01_240)]">
            <div className="max-w-7xl mx-auto px-8">
                <div className="h-96 rounded-[40px] bg-white/5 animate-pulse flex items-center justify-center">
                    <span className="font-outfit font-black italic text-2xl text-white/10 tracking-widest uppercase">IAya Portfolio...</span>
                </div>
            </div>
        </section>
    );

    if (portfolio.length === 0) return null;

    return (
        <section id="portfolio" className="py-32 bg-[oklch(0.13_0.01_240)] relative overflow-hidden">
            {/* Background elements for depth */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-iaya-turquoise/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
                    <div className="flex-1">
                        <SectionHeader
                            intro={t.intro}
                            title={t.title}
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="text-white/40 font-inter text-lg sm:text-xl leading-relaxed max-w-xl -mt-12 mb-8"
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
                        transition={{ delay: 0.8 }}
                        onClick={() => window.location.href = '/portafolio'}
                        className="group relative px-10 py-5 bg-white/5 border border-white/10 rounded-full overflow-hidden transition-all duration-500 hover:border-iaya-ocre/40 shadow-xl self-start lg:self-end"
                    >
                        <div className="absolute inset-0 bg-iaya-ocre/10 opacity-0 group-hover:opacity-100 transition-opacity" />
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
