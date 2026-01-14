import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingBag,
    Zap,
    Search,
    UserCheck,
    Repeat,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Service } from '../services/api';
import { getLocalizedContent, getUiLabels } from '../services/api';

interface SubServiceCardProps {
    subService: Service;
    parentSlug: string;
    locale: string;
    index: number;
    accentColor: string;
}

const SubServiceCard: React.FC<SubServiceCardProps> = ({
    subService,
    parentSlug,
    locale,
    accentColor
}) => {
    const [showExamples, setShowExamples] = useState(false);

    const content = getLocalizedContent(subService, locale);
    const examples = content.examples || [];
    const ui = getUiLabels(locale);

    // Design Tokens from Brief (OKLCH)
    const drawerBg = 'oklch(0% 0 0 / 25%)';
    const drawerBorder = '1px solid oklch(100% 0 0 / 8%)';
    const textContrast = '#E5E7EB'; // oklch(90% 0 0) equivalent

    // Motion Curves from Brief
    const easeShowcase = [0.22, 1, 0.36, 1]; // cubic-bezier(0.22, 1, 0.36, 1)

    // Icon Mapping Logic based on nature of example
    const getExampleIcon = (text: string) => {
        const lower = text.toLowerCase();
        if (lower.includes('vent') || lower.includes('shop') || lower.includes('e-commerce') || lower.includes('venda'))
            return { icon: ShoppingBag, color: 'oklch(70% 0.2 190)' }; // Turquoise
        if (lower.includes('anal') || lower.includes('data') || lower.includes('rag') || lower.includes('search') || lower.includes('databas'))
            return { icon: Search, color: 'oklch(60% 0.2 300)' }; // BlueViolet
        if (lower.includes('format') || lower.includes('humain') || lower.includes('user') || lower.includes('capacitac'))
            return { icon: UserCheck, color: 'oklch(70% 0.2 50)' }; // Orange
        if (lower.includes('auto') || lower.includes('repeat') || lower.includes('cpu') || lower.includes('bot'))
            return { icon: Repeat, color: 'oklch(60% 0.2 270)' }; // Indigo

        return { icon: Zap, color: accentColor }; // Fallback
    };

    const handleInteractionEnter = () => {
        setShowExamples(true);
    };

    const handleInteractionLeave = () => {
        setShowExamples(false);
    };

    const handleClick = (e: React.MouseEvent) => {
        // Mobile check: First tap opens examples, second tap navigates
        if (window.innerWidth < 1024 && !showExamples && examples.length > 0) {
            e.preventDefault();
            setShowExamples(true);
        }
    };

    // Sparkle effect for the badge (The Sparkle Effect)
    const sparkleVariants: any = {
        initial: { x: '-100%', opacity: 0 },
        animate: {
            x: '100%',
            opacity: [0, 1, 0],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <div
            className="relative h-full"
            onMouseEnter={handleInteractionEnter}
            onMouseLeave={handleInteractionLeave}
            onFocus={() => setShowExamples(true)}
            onBlur={() => setShowExamples(false)}
        >
            <Link
                to={`/servicios/${parentSlug}/${subService.slug}`}
                onClick={handleClick}
                className={`block h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group relative overflow-hidden flex flex-col focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-turquoise`}
                style={{
                    '--ring-offset-color': 'var(--color-iaya-bg)',
                    minHeight: '280px'
                } as any}
            >
                {/* Visual Accent Glow */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ background: `linear-gradient(45deg, ${accentColor}, transparent)` }}
                />

                {/* Card Header */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                        <Zap size={24} style={{ color: accentColor }} />
                    </div>

                    {/* Examples Badge with Sparkle */}
                    {examples.length > 0 && (
                        <div className="relative overflow-hidden px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold tracking-widest uppercase text-white/70">
                            {examples.length} Ejemplos
                            <motion.div
                                variants={sparkleVariants}
                                initial="initial"
                                animate="animate"
                                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                            />
                        </div>
                    )}
                </div>

                {/* Card Content */}
                <h3 className="text-2xl font-outfit font-bold mb-4 relative z-10">{content.title}</h3>
                <p className="text-white/60 font-inter mb-8 line-clamp-3 relative z-10 leading-relaxed text-sm">
                    {content.summary || content.description}
                </p>

                {/* CTA with Accessibility Target */}
                <div
                    className="mt-auto inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest group-hover:gap-4 transition-all relative z-10 text-turquoise min-h-[44px]"
                    style={{ color: accentColor }}
                >
                    {ui.cta} <ArrowRight size={18} />
                </div>

                {/* The Drawer (The Showcase Overlay) */}
                <AnimatePresence>
                    {showExamples && (examples.length > 0 || content.full_content) && (
                        <motion.div
                            initial={{ opacity: 0, y: '20%' }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '10%', transition: { duration: 0.2, ease: "easeOut" } }}
                            transition={{ duration: 0.4, ease: easeShowcase as any }}
                            className="absolute inset-0 z-50 p-6 flex flex-col justify-center overflow-y-auto no-scrollbar"
                            style={{
                                backgroundColor: drawerBg,
                                backdropFilter: 'blur(30px)',
                                border: drawerBorder,
                            }}
                        >
                            <div className="space-y-6">
                                {/* Level B: Le Corps (Full Content) */}
                                {content.full_content && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1, duration: 0.4 }}
                                        className="prose prose-invert prose-sm max-w-none text-white/90 leading-relaxed font-[450]
                                                   [&_strong]:font-bold"
                                        style={{ ['--accent-color' as any]: accentColor }}
                                    >
                                        <div
                                            className="[&_strong]:text-[var(--accent-color)]"
                                            dangerouslySetInnerHTML={{ __html: content.full_content }}
                                        />
                                    </motion.div>
                                )}

                                {/* Level C: La Preuve (Examples) */}
                                {examples.length > 0 && (
                                    <div className="space-y-3">
                                        <div className="h-px bg-white/10 w-full" />
                                        <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2">
                                            Cas d'usage
                                        </h4>
                                        <div className="space-y-3">
                                            {examples.map((example, i) => {
                                                const { icon: Icon, color } = getExampleIcon(example);
                                                return (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.2 + i * 0.05, duration: 0.4, ease: easeShowcase as any }}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <div className="mt-1 flex-shrink-0 p-1 rounded-lg bg-white/5 border border-white/5">
                                                            <Icon size={14} style={{ color }} />
                                                        </div>
                                                        <p
                                                            className="text-[13px] leading-relaxed font-[450]"
                                                            style={{ color: textContrast }}
                                                        >
                                                            {example}
                                                        </p>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Hint */}
                            <div className="mt-8 pt-4 border-t border-white/5 lg:hidden">
                                <p className="text-[10px] uppercase tracking-widest text-white/30 text-center">
                                    Tap de nuevo para explorer
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Link>
        </div>
    );
};

export default SubServiceCard;
