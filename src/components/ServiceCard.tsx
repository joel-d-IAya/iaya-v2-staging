import React, { useState, useRef } from 'react';
import { motion, type Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Service } from '../services/api';
import { getLocalizedContent, getAccentColor, getUiLabels } from '../services/api';

interface ServiceCardProps {
    service: Service;
    locale: string;
    index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, locale, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const content = getLocalizedContent(service, locale);
    const accentColor = getAccentColor(service.accent_color);

    // Magnetic effect (subtle)
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Debug Log
    console.log("Rendering service:", (service as any).internal_name || service.id, "with lang:", locale, "found content:", !!content);

    const title = content?.title || "Untitled Service";
    const summary = content?.summary || "No description available";

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            scale: 0.95,
            y: 30,
            backdropFilter: 'blur(0px)'
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            backdropFilter: 'blur(20px)',
            transition: {
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.21, 1.11, 0.81, 0.99] as any
            }
        }
    };

    return (
        <motion.div
            ref={cardRef}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative rounded-[32px] overflow-hidden group p-10 flex flex-col justify-between min-h-[400px] w-full h-full"
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                background: `oklch(18% 0.02 250 / 0.8)`,
                border: `1px solid rgba(255, 255, 255, 0.08)`,
            }}
        >
            {/* Light Sweep Effect */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                <motion.div
                    animate={isHovered ? {
                        x: ['-100%', '200%'],
                        opacity: [0, 0.3, 0]
                    } : { x: '-100%', opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-1/2 h-full skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
            </div>

            {/* Semantic Border Glow using accentColor */}
            <div
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px] pointer-events-none"
                style={{ border: `2px solid ${accentColor}` }}
            />

            {/* Magnetic Glow */}
            <motion.div
                className="absolute inset-0 -z-10 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)`,
                    opacity: isHovered ? 0.2 : 0.05,
                    transform: `translateZ(-1px)`
                }}
            />

            {/* Content Container with parallax-y feel */}
            <div className="relative z-30 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
                <div>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '60px' }}
                        className="h-1.5 mb-8 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        style={{ backgroundColor: accentColor }}
                    />
                    <h3 className="text-3xl sm:text-5xl font-outfit font-bold text-white mb-6 tracking-tight leading-[1.1]">
                        {title}
                    </h3>
                    <p className="font-inter text-white/70 leading-relaxed text-lg max-w-[90%] font-light">
                        {summary}
                    </p>
                </div>

                <div className="mt-12">
                    <button
                        className="group/btn relative px-10 py-4 rounded-full overflow-hidden transition-all duration-300 border border-white/10 hover:border-transparent"
                    >
                        <span className="relative z-10 text-[13px] font-outfit font-bold uppercase tracking-[0.15em] text-white group-hover/btn:text-black transition-colors">
                            {content.cta_text || getUiLabels(locale).cta}
                        </span>
                        <div
                            className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out"
                            style={{ backgroundColor: accentColor }}
                        />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
