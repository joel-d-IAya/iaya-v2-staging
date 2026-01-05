import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchServiceBySlug, getLocalizedContent, getAccentColor } from '../services/api';
import type { Service } from '../services/api';
import DynamicIcon from '../components/ui/DynamicIcon';

interface ServicePageProps {
    activeLang: string;
}

const ServicePage: React.FC<ServicePageProps> = ({ activeLang }) => {
    const { slug, subSlug } = useParams<{ slug: string; subSlug?: string }>();
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            if (!slug) return;
            setLoading(true);
            const data = await fetchServiceBySlug(slug);
            setService(data);
            setLoading(false);
        };
        load();
    }, [slug]);

    const cleanMarkdown = (text: string | undefined): string => {
        if (!text) return '';
        // Remove ### (headings) and ** (bold) markers correctly
        return text
            .replace(/###\s?/g, '') // Remove H3 markers
            .replace(/\*\*/g, '')   // Remove bold markers
            .trim();
    };

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

    // If subSlug is present, we are on a sub-service page
    if (subSlug) {
        const subService = service.sub_services?.find(s => (s.slug === subSlug || String(s.id) === subSlug));
        if (!subService) return <div className="min-h-screen flex items-center justify-center">Sub-service not found</div>;

        const subContent = getLocalizedContent(subService, activeLang);

        return (
            <div className="min-h-screen bg-iaya-bg pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-8">
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

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-invert prose-lg max-w-none font-inter text-white/80 leading-relaxed mb-20"
                        dangerouslySetInnerHTML={{ __html: subContent.full_content || subContent.content || '' }}
                    />

                    {/* CTA / Contact Form Placeholder */}
                    <div className="bg-white/5 rounded-3xl p-12 border border-white/10 text-center">
                        <h2 className="text-3xl font-outfit font-bold mb-6">¿Interesado en este servicio?</h2>
                        <button
                            className="px-10 py-4 rounded-full font-outfit font-bold text-lg transition-all"
                            style={{ backgroundColor: accentColor, color: 'black' }}
                        >
                            Contactar Ahora
                        </button>
                    </div>
                </div>
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
                                const subContent = getLocalizedContent(sub, activeLang);
                                // Determine the subSlug properly
                                const subSlugField = sub.slug || subContent.slug || sub.id;
                                // Simple logic for span: every 3rd item spans 2
                                const colSpan = idx % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1';

                                return (
                                    <Link
                                        key={sub.id}
                                        to={`/services/${slug}/${subSlugField}`}
                                        className={`${colSpan} block`}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group relative overflow-hidden flex flex-col"
                                        >
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                                style={{ background: `linear-gradient(45deg, ${accentColor}, transparent)` }}
                                            />

                                            <DynamicIcon
                                                name={sub.main_icon || 'Zap'}
                                                color={accentColor}
                                                size={32}
                                                className="mb-6"
                                            />
                                            <h3 className="text-2xl font-outfit font-bold mb-4">{subContent.title}</h3>
                                            <p className="text-white/60 font-inter mb-8 line-clamp-3">
                                                {cleanMarkdown(subContent.summary || subContent.description)}
                                            </p>

                                            <div
                                                className="mt-auto inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all"
                                                style={{ color: accentColor }}
                                            >
                                                {activeLang === 'FR' ? 'Découvrir' : activeLang === 'EN' ? 'Discover' : 'Descubrir'} <span className="text-xl">→</span>
                                            </div>
                                        </motion.div>
                                    </Link>
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
