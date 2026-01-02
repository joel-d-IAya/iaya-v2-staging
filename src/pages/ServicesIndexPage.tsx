import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchAllServices, getLocalizedContent, getAccentColor } from '../services/api';
import type { Service } from '../services/api';
import DynamicIcon from '../components/ui/DynamicIcon';

interface ServicesIndexPageProps {
    activeLang: string;
}

const ServicesIndexPage: React.FC<ServicesIndexPageProps> = ({ activeLang }) => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const data = await fetchAllServices();
            setServices(data);
            setLoading(false);
        };
        load();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-iaya-bg">
                <div className="w-12 h-12 border-4 border-iaya-orange border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-iaya-bg pt-48 pb-32">
            <div className="max-w-7xl mx-auto px-8">
                <header className="mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl sm:text-8xl font-outfit font-bold tracking-tighter mb-4"
                    >
                        {activeLang === 'FR' ? 'Nos Solutions' : activeLang === 'EN' ? 'Our Solutions' : 'Nuestras Soluciones'}
                    </motion.h1>
                    <p className="text-xl text-white/50 max-w-2xl font-inter">
                        {activeLang === 'FR' ? 'Découvrez l\'ensemble de notre expertise à travers nos services spécialisés.' :
                            activeLang === 'EN' ? 'Discover all our expertise through our specialized services.' :
                                'Descubre toda nuestra experiencia a través de nuestros servicios especializados.'}
                    </p>
                </header>

                <div className="space-y-40">
                    {services.map((service) => {
                        const content = getLocalizedContent(service, activeLang);
                        const accentColor = getAccentColor(service.accent_color);
                        const serviceSlug = service.slug || content.slug || service.id;

                        return (
                            <section key={service.id} className="relative">
                                {/* Service Header */}
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                                    <div className="max-w-2xl">
                                        <div className="flex items-center gap-6 mb-6">
                                            <DynamicIcon name={service.main_icon || 'Bot'} color={accentColor} size={48} />
                                            <h2 className="text-4xl sm:text-5xl font-outfit font-bold tracking-tight">
                                                {content.title}
                                            </h2>
                                        </div>
                                        <p className="text-lg text-white/70 font-inter leading-relaxed">
                                            {content.summary}
                                        </p>
                                    </div>
                                    <Link
                                        to={`/services/${serviceSlug}`}
                                        className="px-8 py-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all font-outfit font-bold uppercase tracking-widest text-sm"
                                    >
                                        Voir les détails
                                    </Link>
                                </div>

                                {/* Sub-services Grid for this Service */}
                                {service.sub_services && service.sub_services.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        {service.sub_services.map((sub, sIdx) => {
                                            const subContent = getLocalizedContent(sub, activeLang);
                                            const subSlug = sub.slug || subContent.slug || sub.id;
                                            const colSpan = sIdx % 4 === 0 || sIdx % 4 === 3 ? 'md:col-span-1' : 'md:col-span-2';

                                            return (
                                                <Link
                                                    key={sub.id}
                                                    to={`/services/${serviceSlug}/${subSlug}`}
                                                    className={`${colSpan} group bg-white/5 border border-white/10 rounded-[28px] p-8 hover:bg-white/10 transition-all relative overflow-hidden flex flex-col min-h-[280px]`}
                                                >
                                                    <div
                                                        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                                                        style={{ background: accentColor }}
                                                    />
                                                    <DynamicIcon name={sub.main_icon || 'Zap'} color={accentColor} size={32} className="mb-6" />
                                                    <h3 className="text-xl font-outfit font-bold mb-4">{subContent.title}</h3>
                                                    <p className="text-sm text-white/50 font-inter line-clamp-3 mb-8">
                                                        {subContent.summary || subContent.description}
                                                    </p>
                                                    <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all group-hover:gap-4" style={{ color: accentColor }}>
                                                        Découvrir <span>→</span>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ServicesIndexPage;
