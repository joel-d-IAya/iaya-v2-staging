import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Service } from '../services/api';
import { fetchServices } from '../services/api';
import ServiceCard from './ServiceCard';

interface ServicesGridProps {
    locale: string;
}

const TEXTS: Record<string, { badge: string; title: string }> = {
    ES: { badge: 'Nuestra Expertise', title: 'Servicios de Clase Mundial' },
    EN: { badge: 'Our Expertise', title: 'World Class Services' },
    FR: { badge: 'Notre Expertise', title: 'Services de Classe Mondiale' }
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
        <section id="servicios" className="relative py-32 bg-[#050505]">
            <div className="max-w-[1440px] mx-auto px-8 lg:px-24">
                <header className="mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-600 font-outfit uppercase tracking-[0.4em] text-xs mb-6 block font-black italic"
                    >
                        IAya Technology / {t.badge}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-6xl sm:text-[100px] font-black text-white tracking-tighter italic uppercase leading-none"
                    >
                        {t.title}
                    </motion.h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-auto">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))
                        ) : (
                            services.map((service, index) => {
                                const sizeClass = service.home_size?.tailwind_class || 'md:col-span-4';
                                return (
                                    <div key={service.id || index} className={`${sizeClass} col-span-12`}>
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
                    <Link to="/services">
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
