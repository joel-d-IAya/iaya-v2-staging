import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const SkeletonCard = ({ index }: { index: number }) => (
    <div
        className={`rounded-[32px] bg-white/5 border border-white/10 h-[400px] animate-pulse ${index % 3 === 0 ? 'col-span-8' : 'col-span-4'}`}
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
            setServices(data.slice(0, 3));
            setLoading(false);
        };
        load();
    }, []);

    const t = TEXTS[locale] || TEXTS.ES;

    return (
        <section id="servicios" className="relative py-32 bg-[oklch(22%_0.02_250)]">
            <div className="max-w-7xl mx-auto px-8">
                <header className="mb-20 text-center lg:text-left">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-iaya-orange font-outfit uppercase tracking-[0.3em] text-sm mb-6 block font-bold"
                    >
                        {t.badge}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl sm:text-7xl font-outfit font-bold text-white tracking-tighter"
                    >
                        {t.title}
                    </motion.h2>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-auto">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <SkeletonCard key={i} index={i} />
                            ))
                        ) : (
                            services.map((service, index) => {
                                // Rule of 3 harmonious layout: One big (8), one small (4), one full (12)
                                const homeClasses = [
                                    'md:col-span-8 col-span-12',
                                    'md:col-span-4 col-span-12',
                                    'col-span-12'
                                ];
                                return (
                                    <div key={service.id || index} className={homeClasses[index] || 'col-span-4'}>
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
            </div>
        </section>
    );
};

export default ServicesGrid;
