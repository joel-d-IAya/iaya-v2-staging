import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { getAssetUrl, getLocalizedContent, getAccentColor, getUiLabels, type PortfolioItem } from '../services/api';
import * as LucideIcons from 'lucide-react';

interface PortfolioCardProps {
    item: PortfolioItem;
    locale: string;
    index: number;
}

// Icon helper
const IconRenderer = ({ iconName, className }: { iconName?: string, className?: string }) => {
    if (!iconName) return null;
    const IconComponent = (LucideIcons as any)[iconName];
    if (!IconComponent) return null;
    return <IconComponent className={className} />;
};

export default function PortfolioCard({ item, locale, index }: PortfolioCardProps) {
    const content = getLocalizedContent(item, locale);
    const accentColor = getAccentColor(item.accent_color);
    const [isHovered, setIsHovered] = useState(false);

    // Tilt Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

    const labels = getUiLabels(locale);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        x.set(mouseXVal / width - 0.5);
        y.set(mouseYVal / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const spotlightBackground = useTransform(
        [mouseX, mouseY],
        ([xVal, yVal]) => `radial-gradient(600px circle at ${(xVal as number) * 100 + 50}% ${(yVal as number) * 100 + 50}%, color-mix(in srgb, ${accentColor}, transparent 80%), transparent 40%)`
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{ perspective: 1000 }}
            className="relative h-full"
        >
            <motion.div
                className="relative h-full rounded-[40px] overflow-hidden group cursor-pointer border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-700 shadow-2xl"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    borderColor: isHovered ? accentColor : 'rgba(255,255,255,0.1)',
                    boxShadow: isHovered ? `0 20px 40px -20px color-mix(in srgb, ${accentColor}, transparent 50%)` : 'none',
                }}
                onClick={() => window.location.href = `/portafolio/${item.slug}`}
            >
                {/* 1:1 Image */}
                <div className="relative aspect-square overflow-hidden bg-black/40">
                    {item.main_image && (
                        <img
                            src={getAssetUrl(item.main_image)}
                            alt={content.title || ""}
                            loading="lazy"
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                        />
                    )}

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Content over image */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <div className="flex items-center gap-4 mb-4">
                            <motion.div
                                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-lg border border-white/10 text-white transition-all duration-500"
                                animate={{
                                    rotate: isHovered ? 360 : 0,
                                    scale: isHovered ? 1.1 : 1,
                                    color: isHovered ? accentColor : '#fff'
                                }}
                            >
                                <IconRenderer iconName={item.main_icon} className="w-6 h-6" />
                            </motion.div>
                            <span className="text-[10px] font-outfit font-bold uppercase tracking-[0.3em] text-white/60">
                                {locale === 'ES' ? 'Caso de Éxito' : locale === 'FR' ? 'Cas de Réussite' : 'Success Story'}
                            </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-outfit font-bold text-white mb-2 leading-tight tracking-tight">
                            {content.title}
                        </h3>

                        <AnimatePresence>
                            {isHovered && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                    animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                    className="text-white/70 font-inter text-sm leading-relaxed line-clamp-2"
                                >
                                    {content.excerpt}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Footer / CTA reveal */}
                <div className="p-6 bg-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-2 h-2 rounded-full transition-all duration-500"
                            style={{ backgroundColor: isHovered ? accentColor : 'rgba(255,255,255,0.2)' }}
                        />
                        <span className="text-[10px] font-outfit font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                            {labels.exploreCaseStudy}
                        </span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                        <LucideIcons.ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transform group-hover:translate-x-1 transition-all" />
                    </div>
                </div>

                {/* Light Sweep (Spotlight) */}
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700"
                    style={{
                        background: spotlightBackground
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
