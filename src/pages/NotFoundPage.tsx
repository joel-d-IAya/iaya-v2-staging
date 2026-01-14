import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import video404 from '../assets/404_raw.mp4';

interface NotFoundPageProps {
    activeLang: string;
}

const TEXTS: Record<string, { title: string; subtitle: string; description: string; cta: string; trilingual: string }> = {
    ES: {
        title: "Error / 404",
        subtitle: "¿Perdido?",
        description: "Parece que has llegado a un territorio inexplorado. No te preocupes, el futuro todavía se está construyendo.",
        cta: "Volver al inicio",
        trilingual: "Oups! Page non trouvée / Oops! Page not found"
    },
    EN: {
        title: "Error / 404",
        subtitle: "Lost?",
        description: "It seems you've reached unexplored territory. Don't worry, the future is still under construction.",
        cta: "Back to Home",
        trilingual: "¡Vaya! Página no encontrada / Oups! Page non trouvée"
    },
    FR: {
        title: "Erreur / 404",
        subtitle: "Perdu ?",
        description: "Il semble que vous soyez arrivé en territoire inconnu. Ne vous inquiétez pas, le futur est encore en construction.",
        cta: "Retour à l'accueil",
        trilingual: "Oops! Page not found / ¡Vaya! Página no encontrada"
    }
};

const NotFoundPage: React.FC<NotFoundPageProps> = ({ activeLang }) => {
    const t = TEXTS[activeLang] || TEXTS.ES;

    return (
        <div className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden bg-iaya-bg">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src={video404} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-iaya-bg/80 via-transparent to-iaya-bg/80" />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 max-w-4xl px-8 text-center"
            >
                <div className="glass-2 p-12 md:p-20 rounded-[40px] border border-white/10 shadow-2xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-outfit font-black tracking-tight md:tracking-tighter leading-none mb-4 pb-4 px-4 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent"
                    >
                        {t.subtitle}
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl font-outfit font-bold uppercase tracking-[0.3em] text-iaya-turquoise mb-8"
                    >
                        {t.title}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-white/60 font-inter leading-relaxed mb-12 max-w-[290px] mx-auto mt-8"
                    >
                        {t.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Link
                            to="/"
                            className="inline-block px-12 py-5 rounded-full bg-white text-iaya-bg font-outfit font-bold text-lg hover:bg-iaya-orange hover:text-white transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
                        >
                            {t.cta}
                        </Link>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 text-sm text-white/20 font-inter italic"
                    >
                        {t.trilingual}
                    </motion.p>
                </div>
            </motion.div>

            {/* Cinematic Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-iaya-orange/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-iaya-turquoise/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 animate-pulse" />
        </div>
    );
};

export default NotFoundPage;
