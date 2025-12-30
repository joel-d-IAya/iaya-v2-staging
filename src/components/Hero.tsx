import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import andes from '../assets/andes.png';

interface CardProps {
    id: number;
    title: string;
    body?: string;
    list?: string[];
    ctaText: string;
    ctaStyle: 'outline' | 'solid' | 'primary' | 'ghost' | 'rounded' | 'cyan';
    color: string;
    baseRotation: number;
    auraColor: string;
    scale?: number;
}

const LOCALIZED_CARDS: Record<string, CardProps[]> = {
    ES: [
        {
            id: 0,
            title: "Actualidad IA",
            body: "Noticias diarias del mundo de la Inteligencia Artificial. No te pierdas las últimas novedades.",
            ctaText: "Leer más",
            ctaStyle: 'outline',
            color: 'oklch(65% 0.2 45 / 15%)',
            auraColor: 'oklch(65% 0.2 45 / 40%)',
            baseRotation: -8,
        },
        {
            id: 1,
            title: "Nuestros Servicios",
            body: "Soluciones a medida: Capacitación, Agentes IA y Automatización estratégica.",
            ctaText: "Ver Soluciones",
            ctaStyle: 'solid',
            color: 'oklch(70% 0.15 190 / 15%)',
            auraColor: 'oklch(70% 0.15 190 / 40%)',
            baseRotation: -4,
        },
        {
            id: 2,
            title: "Ancla el futuro en tu presente",
            body: "Una agencia de IA diferente con un anclaje local y un enfoque humano.",
            ctaText: "Iniciar Proyecto",
            ctaStyle: 'primary',
            color: 'oklch(25% 0.05 250 / 40%)',
            auraColor: 'oklch(65% 0.20 45 / 40%)',
            baseRotation: 0,
            scale: 1.1,
        },
        {
            id: 3,
            title: "Espacio Recreo",
            body: "Aprende más de la inteligencia artificial gracias a nuestras anécdotas y experimentos diarios.",
            ctaText: "Descubrir",
            ctaStyle: 'ghost',
            color: 'oklch(50% 0.15 280 / 15%)',
            auraColor: 'oklch(50% 0.15 280 / 40%)',
            baseRotation: 4,
        },
        {
            id: 4,
            title: "¿Hablamos?",
            body: "¿Quieres conocer mejor nuestro ecosistema? Agendemos una sesión de descubrimiento hoy.",
            ctaText: "Agendar Cita",
            ctaStyle: 'cyan',
            color: 'oklch(90% 0.02 250 / 20%)',
            auraColor: 'oklch(90% 0.02 250 / 60%)',
            baseRotation: 8,
        }
    ],
    EN: [
        {
            id: 0,
            title: "AI Pulse",
            body: "Daily updates from the AI world. Stay ahead with the latest innovation.",
            ctaText: "Read more",
            ctaStyle: 'outline',
            color: 'oklch(65% 0.2 45 / 15%)',
            auraColor: 'oklch(65% 0.2 45 / 40%)',
            baseRotation: -8,
        },
        {
            id: 1,
            title: "Our Services",
            body: "Custom solutions: Training, AI Agents, and Strategic Automation.",
            ctaText: "View Solutions",
            ctaStyle: 'solid',
            color: 'oklch(70% 0.15 190 / 15%)',
            auraColor: 'oklch(70% 0.15 190 / 40%)',
            baseRotation: -4,
        },
        {
            id: 2,
            title: "Anchor the future today",
            body: "A different AI agency with local roots and a human-centered approach.",
            ctaText: "Start Project",
            ctaStyle: 'primary',
            color: 'oklch(25% 0.05 250 / 40%)',
            auraColor: 'oklch(65% 0.20 45 / 40%)',
            baseRotation: 0,
            scale: 1.1,
        },
        {
            id: 3,
            title: "Recreo Space",
            body: "Learn more about AI through our daily experiments and stories.",
            ctaText: "Discover",
            ctaStyle: 'ghost',
            color: 'oklch(50% 0.15 280 / 15%)',
            auraColor: 'oklch(50% 0.15 280 / 40%)',
            baseRotation: 4,
        },
        {
            id: 4,
            title: "Let's Talk?",
            body: "Want to learn more about our ecosystem? Book a discovery session today.",
            ctaText: "Book Now",
            ctaStyle: 'cyan',
            color: 'oklch(90% 0.02 250 / 20%)',
            auraColor: 'oklch(90% 0.02 250 / 60%)',
            baseRotation: 8,
        }
    ],
    FR: [
        {
            id: 0,
            title: "Actualité IA",
            body: "Mises à jour quotidiennes du monde de l'IA. Ne manquez pas les dernières innovations.",
            ctaText: "En savoir plus",
            ctaStyle: 'outline',
            color: 'oklch(65% 0.2 45 / 15%)',
            auraColor: 'oklch(65% 0.2 45 / 40%)',
            baseRotation: -8,
        },
        {
            id: 1,
            title: "Nos Services",
            body: "Solutions sur mesure : Formation, Agents IA et Automatisation stratégique.",
            ctaText: "Solutions",
            ctaStyle: 'solid',
            color: 'oklch(70% 0.15 190 / 15%)',
            auraColor: 'oklch(70% 0.15 190 / 40%)',
            baseRotation: -4,
        },
        {
            id: 2,
            title: "Ancrez le futur maintenant",
            body: "Une agence d'IA différente avec un ancrage local et une approche humaine.",
            ctaText: "Démarrer",
            ctaStyle: 'primary',
            color: 'oklch(25% 0.05 250 / 40%)',
            auraColor: 'oklch(65% 0.20 45 / 40%)',
            baseRotation: 0,
            scale: 1.1,
        },
        {
            id: 3,
            title: "Espace Récré",
            body: "Apprenez-en plus sur l'IA grâce à nos anecdotes et expériences quotidiennes.",
            ctaText: "Découvrir",
            ctaStyle: 'ghost',
            color: 'oklch(50% 0.15 280 / 15%)',
            auraColor: 'oklch(50% 0.15 280 / 40%)',
            baseRotation: 4,
        },
        {
            id: 4,
            title: "Parlons-nous ?",
            body: "Vous voulez découvrir notre écosystème ? Prenez rendez-vous dès aujourd'hui.",
            ctaText: "Contact",
            ctaStyle: 'cyan',
            color: 'oklch(90% 0.02 250 / 20%)',
            auraColor: 'oklch(90% 0.02 250 / 60%)',
            baseRotation: 8,
        }
    ]
};

const GemSVG = () => (
    <motion.svg
        viewBox="0 0 100 100"
        className="absolute w-32 h-32 opacity-20 pointer-events-none -right-8 -top-8"
        animate={{ rotate: 360, y: [0, 5, 0] }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
    >
        <path d="M50 10 L85 35 L85 75 L50 90 L15 75 L15 35 Z" fill="none" stroke="white" strokeWidth="0.5" />
        <path d="M50 10 L50 90 M15 35 L85 35 M15 75 L85 75 M50 10 L15 35 M50 10 L85 35 M50 90 L15 75 M50 90 L85 75" fill="none" stroke="white" strokeWidth="0.2" opacity="0.5" />
        <circle cx="50" cy="50" r="2" fill="white" />
    </motion.svg>
);

const CardDecoration = ({ id }: { id: number }) => {
    if (id === 0) {
        return (
            <div
                className="absolute inset-0 opacity-[0.15] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, oklch(65% 0.2 45 / 0.8) 1px, transparent 1px)`,
                    backgroundSize: '24px 24px',
                }}
            >
                <motion.div
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        background: [
                            'radial-gradient(circle at 20% 20%, white 0%, transparent 10%)',
                            'radial-gradient(circle at 80% 80%, white 0%, transparent 10%)',
                            'radial-gradient(circle at 20% 20%, white 0%, transparent 10%)'
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0"
                />
            </div>
        );
    }
    if (id === 1) {
        return (
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none filter blur-[40px]">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, -50, 0],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-iaya-turquoise opacity-50 will-change-transform"
                />
                <motion.div
                    animate={{
                        x: [0, -80, 0],
                        y: [0, -100, 50, 0],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-iaya-turquoise opacity-30 will-change-transform"
                />
            </div>
        );
    }
    if (id === 2) {
        return (
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, oklch(70% 0.1 45 / 0.4), transparent 70%)',
                }}
            />
        );
    }
    if (id === 3) {
        return (
            <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ rotate: { duration: 25, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
                className="absolute -bottom-8 -right-8 w-32 h-32 opacity-[0.15] pointer-events-none will-change-transform"
                style={{
                    clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                    background: 'linear-gradient(135deg, oklch(60% 0.2 280), oklch(40% 0.2 280))',
                }}
            />
        );
    }
    if (id === 4) {
        return (
            <div
                className="absolute inset-0 opacity-[0.12] pointer-events-none"
                style={{
                    backgroundImage: `repeating-conic-gradient(from 0deg at 100% 100%, transparent 0deg 10deg, oklch(100% 0 0 / 0.5) 11deg 12deg)`,
                }}
            />
        );
    }
    return null;
};

const Card: React.FC<CardProps & { offset: number, isActive: boolean, fontWeight?: any }> = ({ id, title, body, list, ctaText, ctaStyle, color, auraColor, isActive, fontWeight }) => {
    const isWatermarkNews = id === 0;
    const isWatermarkMountain = id === 2;
    const isRecreo = id === 3;
    const isHablamos = id === 4;

    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            layout
            initial={false}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative flex flex-col p-10 w-[450px] sm:w-[500px] h-[320px] sm:h-[350px] rounded-[24px] shadow-2xl overflow-hidden group transition-all duration-500"
            style={{
                background: `linear-gradient(${color}, ${color}) padding-box, linear-gradient(135deg, oklch(98% 0.01 250 / 0.8) 0%, oklch(20% 0.01 250 / 0) 50%, oklch(98% 0.01 250 / 0.6) 100%) border-box`,
                border: '1px solid transparent',
                backdropFilter: 'blur(40px) saturate(220%)',
                transform: 'translateZ(0)'
            }}
        >
            <CardDecoration id={id} />

            {/* Vibrant Aura Glow */}
            <div
                className="absolute inset-x-0 -bottom-1/2 h-full -z-10 blur-[80px] opacity-30 transition-all duration-700"
                style={{ background: `radial-gradient(circle at center, ${auraColor}, transparent 70%)` }}
            />

            {/* Watermarks */}
            {isWatermarkNews && (
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,20 Q50,0 100,20 M0,50 Q50,30 100,50 M0,80 Q50,60 100,80" fill="none" stroke="white" strokeWidth="0.5" />
                        <circle cx="20" cy="20" r="1" fill="white" />
                        <circle cx="80" cy="50" r="1" fill="white" />
                        <circle cx="40" cy="80" r="1" fill="white" />
                    </svg>
                </div>
            )}
            {isWatermarkMountain && (
                <div className="absolute inset-x-0 bottom-0 top-1/2 opacity-[0.05] pointer-events-none flex items-end justify-center">
                    <img src={andes} alt="" className="w-full h-auto object-contain grayscale brightness-200" />
                </div>
            )}
            {isRecreo && <GemSVG />}

            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center text-center h-full z-10"
            >
                <div className="flex-1 flex flex-col justify-center">
                    <motion.h2
                        style={{ fontWeight: isActive && ctaStyle === 'primary' ? fontWeight : undefined }}
                        className={`font-outfit font-bold ${ctaStyle === 'primary' ? 'text-[28px] sm:text-[36px] tracking-[-0.02em]' : 'text-[22px] sm:text-[28px]'} text-white mb-2 sm:mb-4 leading-tight transition-opacity ${!isActive && 'opacity-60'}`}
                    >
                        {title}
                    </motion.h2>
                    <div className={!isActive ? 'opacity-40' : 'opacity-100'}>
                        {body && (
                            <motion.p
                                animate={isRecreo && isHovered ? { opacity: [0.8, 1, 0.8], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                                className={`font-inter ${ctaStyle === 'primary' ? 'text-[16px] sm:text-[18px] font-light max-w-[400px]' : 'text-[13px] sm:text-[15px] font-normal max-w-[380px]'} text-white/90 mx-auto tracking-wide leading-relaxed whitespace-pre-line`}
                            >
                                {body}
                            </motion.p>
                        )}
                        {list && (
                            <ul className="space-y-2 sm:space-y-3 mt-2 sm:mt-4 flex flex-col items-center">
                                {list.map((item, idx) => (
                                    <li key={idx} className={`text-white font-inter ${isHablamos ? 'font-medium text-[14px] sm:text-[16px] italic opacity-90' : 'font-semibold text-[14px] sm:text-[16px]'} flex items-center`}>
                                        <span className="mr-2 opacity-50">•</span> {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className={`mt-auto transition-all duration-300 ${!isActive ? 'opacity-20 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
                    {ctaStyle === 'outline' && (
                        <button className="px-5 py-2 rounded-[8px] border border-iaya-orange text-white text-[12px] font-outfit uppercase tracking-wider hover:bg-iaya-orange hover:text-black transition-all">
                            {ctaText}
                        </button>
                    )}
                    {ctaStyle === 'solid' && (
                        <button className="px-6 py-2.5 rounded-[8px] bg-iaya-turquoise text-black text-[14px] font-inter font-bold hover:brightness-110 shadow-lg shadow-iaya-turquoise/20 transition-all">
                            {ctaText}
                        </button>
                    )}
                    {ctaStyle === 'primary' && (
                        <button className="px-10 py-4 rounded-full bg-iaya-orange text-white text-[18px] font-outfit font-bold shadow-[0_0_20px_oklch(65%_0.20_45_/_40%)] hover:shadow-[0_0_30px_oklch(65%_0.20_45_/_60%)] transition-all">
                            {ctaText}
                        </button>
                    )}
                    {ctaStyle === 'ghost' && (
                        <button className="text-white text-[14px] border-b-2 border-white opacity-70 hover:opacity-100 transition-opacity pb-1">
                            {ctaText}
                        </button>
                    )}
                    {ctaStyle === 'cyan' && (
                        <button className="px-8 py-3 rounded-full bg-[oklch(75%_0.25_180)] text-black text-[15px] font-outfit font-bold hover:brightness-110 shadow-[0_10px_30px_rgba(0,255,255,0.3)] transition-all uppercase tracking-wider">
                            {ctaText}
                        </button>
                    )}
                    {ctaStyle === 'rounded' && (
                        <button className="px-6 py-2.5 rounded-full bg-white text-black text-[14px] font-inter font-medium hover:bg-white/90 transition-colors">
                            {ctaText}
                        </button>
                    )}
                </div>
            </motion.div>

            {isActive && (
                <div
                    className="absolute inset-0 -z-20 opacity-20 transition-all duration-1000"
                    style={{ backgroundImage: `radial-gradient(circle at center, ${auraColor}, transparent 70%)` }}
                />
            )}
        </motion.div>
    );
};

export default function Hero({ locale = 'ES' }: { locale?: string }) {
    const CARDS = LOCALIZED_CARDS[locale] || LOCALIZED_CARDS.ES;
    const [activeIndex, setActiveIndex] = useState(2);

    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();

    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const springConfig = { stiffness: 150, damping: 20 };
    const mouseX = useSpring(mx, springConfig);
    const mouseY = useSpring(my, springConfig);

    const rotateX = useTransform(mouseY, [-50, 50], [5, -5]);
    const rotateY = useTransform(mouseX, [-50, 50], [-5, 5]);

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mx.set((event.clientX - centerX) / 20);
        my.set((event.clientY - centerY) / 20);
    };

    const handleMouseLeave = () => {
        mx.set(0);
        my.set(0);
    };

    const getCardAt = (offset: number) => {
        const total = CARDS.length;
        return CARDS[(activeIndex + offset + total) % total];
    };

    const handleCardClick = (offset: number) => {
        if (offset === 0) return;
        setActiveIndex((prev: number) => (prev + offset + CARDS.length) % CARDS.length);
    };


    const mountainsY = useTransform(scrollY, [0, 500], [0, 100]);
    const fontWeight = useTransform(scrollY, [0, 300], [700, 900]);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative min-h-screen bg-iaya-bg overflow-hidden pt-32 pb-48 sm:pb-64 flex flex-col items-center"
        >
            <div className="absolute inset-0 bg-radial-[at_50%_30%] from-white/10 via-transparent to-transparent pointer-events-none" />

            <motion.div
                style={{ x: mouseX, y: mouseY, rotateX, rotateY, perspective: 1200 }}
                className="relative z-20 w-full max-w-7xl h-[450px] flex items-center justify-center -translate-y-[60px]"
            >
                <AnimatePresence mode="popLayout" initial={false}>
                    {[-2, -1, 1, 2, 0].map((offset) => {
                        const card = getCardAt(offset);
                        const isActive = offset === 0;

                        const xPos = offset * (isActive ? 0 : 450);
                        const zIndex = isActive ? 50 : 40 - Math.abs(offset);
                        const scale = isActive ? 1.1 : 0.85;
                        const rotation = offset * 4;
                        const opacity = 1 - Math.abs(offset) * 0.25;

                        return (
                            <motion.div
                                key={card.id}
                                layoutId={`card-${card.id}`}
                                initial={{ opacity: 0, x: offset * 400, scale: 0.5, rotate: offset * 15 }}
                                animate={{
                                    opacity,
                                    x: xPos,
                                    scale,
                                    rotate: rotation,
                                    zIndex,
                                    y: isActive ? 0 : 20,
                                }}
                                exit={{ opacity: 0, scale: 0.5, x: -offset * 400 }}
                                transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                onClick={() => handleCardClick(offset)}
                                className="absolute cursor-pointer"
                            >
                                <Card {...card} offset={offset} isActive={isActive} fontWeight={fontWeight} />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            <motion.div
                style={{
                    y: mountainsY,
                    bottom: '0px',
                }}
                className="absolute left-0 w-full z-10 pointer-events-none"
            >
                <div className="mountain-container relative w-full flex justify-center translate-y-[-35px]">
                    <img
                        src={andes}
                        alt="Andes Mountains"
                        className="w-full max-w-7xl h-auto object-contain opacity-40 relative z-10"
                        style={{ transform: 'translateY(-10px)' }}
                    />
                    {/* Shadow/Anchor at the base */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-32 bg-radial-[at_50%_100%] from-[oklch(25%_0.02_250_/_0.3)] to-transparent blur-2xl -z-10" />
                </div>
            </motion.div>
        </div>
    );
}
