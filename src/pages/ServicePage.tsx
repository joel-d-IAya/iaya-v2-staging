import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { fetchServiceBySlug, getLocalizedContent, getAccentColor, getUiLabels, fetchAllServices } from '../services/api';
import type { Service } from '../services/api';
import DynamicIcon from '../components/ui/DynamicIcon';
import SubServiceCard from '../components/SubServiceCard';
import SubServiceDetails from '../components/SubServiceDetails';

import NexoDrawer from '../components/NexoDrawer';

interface ServicePageProps {
    activeLang: string;
}

const ServicePage: React.FC<ServicePageProps> = ({ activeLang }) => {
    const { serviceSlug, subServiceSlug } = useParams<{ serviceSlug: string; subServiceSlug?: string }>();
    const [service, setService] = useState<Service | null>(null);
    const [allServices, setAllServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const ui = getUiLabels(activeLang);

    useEffect(() => {
        const load = async () => {
            if (!serviceSlug) return;
            setLoading(true);
            const [data, servicesData] = await Promise.all([
                fetchServiceBySlug(serviceSlug),
                fetchAllServices()
            ]);
            setService(data);
            setAllServices(servicesData);
            setLoading(false);
        };
        load();
    }, [serviceSlug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-iaya-bg">
                <div className="w-12 h-12 border-4 border-iaya-orange border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-iaya-bg">
                <h1 className="text-4xl font-outfit font-bold">Service Not Found</h1>
            </div>
        );
    }

    const content = getLocalizedContent(service, activeLang);
    const accentColor = getAccentColor(service.accent_color);

    // If subServiceSlug is present, we are on a sub-service page
    if (subServiceSlug) {
        const subService = service.sub_services?.find(s => s.slug === subServiceSlug);
        if (!subService) return <div className="min-h-screen flex items-center justify-center">Sub-service not found</div>;

        const subContent = getLocalizedContent(subService, activeLang);

        return (
            <div className="min-h-screen bg-iaya-bg pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-8">
                    {/* Back Link */}
                    <Link
                        to={`/servicios/${serviceSlug}`}
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">{ui.back}</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <DynamicIcon
                            name={subService.main_icon || 'Zap'}
                            color={accentColor}
                            size={64}
                            className="mx-auto mb-8"
                        />
                        <h1 className="text-5xl sm:text-7xl font-outfit font-bold mb-8 tracking-tighter">
                            {subContent.title}
                        </h1>
                    </motion.div>

                    <SubServiceDetails
                        translationData={subContent}
                        accentColor={accentColor}
                    />

                    {/* CTA / Contact Form Placeholder */}
                    <div className="bg-white/5 rounded-3xl p-12 border border-white/10 text-center mt-20 mb-20">
                        <h2 className="text-3xl font-outfit font-bold mb-6">{ui.interestedHeader}</h2>
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="px-10 py-4 rounded-full font-outfit font-bold text-lg transition-all active:scale-95 shadow-lg"
                            style={{ backgroundColor: accentColor, color: 'black' }}
                        >
                            {ui.contactNow}
                        </button>
                    </div>

                    {/* SEO / Internal Links Footer */}
                    <div className="pt-16 border-t border-white/5">
                        <h3 className="text-xl font-outfit font-bold mb-10 text-white/80">{ui.relatedLinksHeader}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                            {allServices.map(s => {
                                const sContent = getLocalizedContent(s, activeLang);
                                return (
                                    <div key={s.id} className="space-y-4">
                                        <Link
                                            to={`/servicios/${s.slug}`}
                                            className="text-lg font-bold hover:text-turquoise transition-colors block"
                                            style={{ color: s.accent_color }}
                                        >
                                            {sContent.title}
                                        </Link>
                                        <ul className="space-y-2">
                                            {s.sub_services?.map(sub => {
                                                const subC = getLocalizedContent(sub, activeLang);
                                                return (
                                                    <li key={sub.id}>
                                                        <Link
                                                            to={`/servicios/${s.slug}/${sub.slug}`}
                                                            className="text-sm text-white/40 hover:text-white transition-colors block"
                                                        >
                                                            {subC.title}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <NexoDrawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    activeLang={activeLang}
                    allServices={allServices}
                    defaultServiceSlug={serviceSlug}
                    defaultSubServiceSlug={subServiceSlug}
                />
            </div>
        );
    }

    // Otherwise, Parent Page
    return (
        <div className="min-h-screen bg-iaya-bg">
            {/* Hero Section */}
            <section className="pt-48 pb-20 border-b border-white/5 relative overflow-hidden">
                {/* Background Glow */}
                <div
                    className="absolute top-0 right-0 w-[500px] h-[500px] blur-[150px] opacity-20 pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)` }}
                />

                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-start gap-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex-shrink-0"
                        >
                            <DynamicIcon
                                name={service.main_icon || 'Bot'}
                                color={accentColor}
                                size={120}
                            />
                        </motion.div>

                        <div className="max-w-3xl">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-6xl sm:text-8xl font-outfit font-bold mb-10 tracking-tighter leading-none"
                            >
                                {content.title}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="prose prose-invert prose-2xl font-inter text-white/70 leading-relaxed text-balance"
                                dangerouslySetInnerHTML={{ __html: content.full_content || content.content || '' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sub-Services Bento Grid */}
            {service.sub_services && service.sub_services.length > 0 && (
                <section className="py-32">
                    <div className="max-w-7xl mx-auto px-8">
                        <header className="mb-20">
                            <h2 className="text-4xl font-outfit font-bold">Nuestras Soluciones</h2>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {service.sub_services.map((sub, idx) => {
                                const subAccentColor = sub.accent_color ? getAccentColor(sub.accent_color) : accentColor;
                                return (
                                    <div
                                        key={sub.id}
                                        className={sub.page_size?.tailwind_class || (idx % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1')}
                                    >
                                        <SubServiceCard
                                            subService={sub}
                                            parentSlug={serviceSlug || ''}
                                            locale={activeLang}
                                            index={idx}
                                            accentColor={subAccentColor}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ServicePage;
