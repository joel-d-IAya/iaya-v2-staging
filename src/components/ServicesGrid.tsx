import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Service } from '../services/api';
import { fetchServices } from '../services/api';
import ServiceCard from './ServiceCard';
import SectionHeader from './SectionHeader';

interface ServicesGridProps {
    locale: string;
}

const TEXTS: Record<string, { intro: string; title: string }> = {
    ES: { intro: 'NUESTRA EXPERTISE', title: 'Servicios de Clase Mundial' },
    EN: { intro: 'OUR EXPERTISE', title: 'World Class Services' },
    FR: { intro: 'NOTRE EXPERTISE', title: 'Services de Classe Mondiale' }
};

const GRID_MAP: Record<string, string> = {
    "col-span-4": "md:col-span-4",
    "col-span-6": "md:col-span-6",
    "col-span-8": "md:col-span-8",
    "col-span-12": "md:col-span-12"
};

const SkeletonCard = () => (
    <div
        className="rounded-[32px] bg-white/5 border border-white/10 h-[400px] animate-pulse md:col-span-4 col-span-12"
    />
);

const ServicesGrid: React.FC<ServicesGridProps> = ({ locale }) => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const data = await fetchServices();
            console.log("Directus Data in Grid:", data);
            setServices(data);
            setLoading(false);
        };
        load();
    }, []);

    const t = TEXTS[locale] || TEXTS.ES;

    return (
        <section id="servicios" className="relative py-32 bg-iaya-bg">
            <div className="max-w-7xl mx-auto px-8">
                <SectionHeader
                    intro={t.intro}
                    title={t.title}
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-auto">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))
                        ) : (
                            services.map((service, index) => {
                                const spanClass = GRID_MAP[service.home_size?.tailwind_class || ''] || "md:col-span-4";
                                return (
                                    <div key={service.id || index} className={`${spanClass} col-span-1`}>
                                        <ServiceCard
                                            service={service}
                                            locale={locale}
                                            index={index}
                                        />
                                    </div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>
                <div className="mt-20 flex justify-center">
                    <Link to="/servicios">
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 rounded-full bg-white text-iaya-bg font-outfit font-bold text-lg hover:bg-iaya-orange hover:text-white transition-all duration-300 shadow-xl shadow-iaya-orange/10"
                        >
                            {locale === 'ES' && 'Descubrir todos nuestros servicios'}
                            {locale === 'EN' && 'Discover all our Services'}
                            {locale === 'FR' && 'Découvrir tous nos services'}
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
