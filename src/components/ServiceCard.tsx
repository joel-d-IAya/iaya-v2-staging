import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Service } from '../services/api';
import { getLocalizedContent } from '../services/api';

interface ServiceCardProps {
    service: Service;
    locale: string;
    index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, locale, index }) => {
    const content = getLocalizedContent(service, locale);
    const accentColor = service.accent_color || '#1a1a1a';

    const title = content?.title || "Sin título";
    const serviceSlug = service.slug;

    // Construction de l'URL par Slug
    const targetUrl = `/services/${serviceSlug}`;

    return (
        <Link
            to={targetUrl}
            className="block h-full group"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:scale-[1.01] border border-white/5 flex flex-col justify-between min-h-[300px] shadow-2xl h-full"
                style={{ backgroundColor: accentColor }}
            >
                <div className="relative z-10">
                    <h3 className="text-4xl font-black text-white leading-tight tracking-tighter uppercase italic drop-shadow-md">
                        {title}
                    </h3>
                </div>

                <div className="relative z-10 flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white/70 transition-colors mb-2">
                            IAya Technology
                        </span>
                        <span className="text-sm font-bold text-white/90">
                            {locale === 'ES' ? 'Explorar Proyecto' : locale === 'EN' ? 'Explore Project' : 'Explorer le Projet'} →
                        </span>
                    </div>
                    <div className="h-14 w-14 rounded-full bg-black/30 flex items-center justify-center text-white backdrop-blur-2xl border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14m-7-7 7 7-7 7" />
                        </svg>
                    </div>
                </div>

                {/* Effets visuels de profondeur et de brillance */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent opacity-60" />
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
        </Link>
    );
};

export default ServiceCard;
