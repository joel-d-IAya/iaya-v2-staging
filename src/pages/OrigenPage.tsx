import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, HeartHandshake, Globe, Zap, Sparkles } from 'lucide-react';
import joelImage from '../assets/joel.png';
import backgroundIncaStones from '../assets/background-inca-stones.jpg';
import NexoForm from '../components/NexoForm';

interface OrigenPageProps {
    activeLang: string;
}

const OrigenPage: React.FC<OrigenPageProps> = ({ activeLang }) => {
    const content = {
        FR: {
            title: "El Origen",
            subtitle: "Renaissance & Engagement",
            manifestoTitle: "Le Manifeste du Fondateur",
            manifesto: "Mon parcours n’est pas une ligne droite, mais une suite de cycles. Des agences de publicité bruxelloises aux projets de l’Union Européenne, j’ai appris la rigueur. Mais c'est à Cuenca, à travers les défis personnels et entrepreneuriaux, après une expérience peu convaincante de restaurateur, que j'ai trouvé ma véritable mission : mettre l'IA au service de ceux qui en ont le plus besoin.",
            piliers: [
                { title: "Anclaje Local", text: "Entendemos los desafíos y oportunidades de nuestra región. Somos su socio de IA de proximidad en el Azuay.", icon: MapPin, color: 'oklch(0.65 0.18 45)' },
                { title: "Enfoque Humano", text: "Detrás de la tecnología, está el ser humano. Le escuchamos y le acompañamos en cada paso de su transformación.", icon: HeartHandshake, color: 'oklch(0.70 0.15 160)' },
                { title: "Compromiso Comunitario", text: "Nos comprometemos a apoyar a las ONGs locales ofreciendo nuestras servicios a tarifas preferenciales para un impacto social positivo.", icon: Globe, color: 'oklch(0.80 0.10 200)' }
            ],
            teamTitle: "L'Équipe Hybride",
            teamSubtitle: "Hybrid Intelligence",
            team: [
                { name: "DiayaVinci", role: "Visionnaire Esthétique (Design & Psychologie)" },
                { name: "TechBoss", role: "Gardien Architecture & Stabilité" },
                { name: "PromptAnty", role: "Logicienne des Flux et Interactions" },
                { name: "Directorus", role: "Stratège Business Résultats Réels" },
                { name: "n8nflow_king", role: "Maître Automatisation & Workflows" },
                { name: "PromptGenius", role: "Poète de la Précision LLM" }
            ],
            joinTitle: "L'Appel aux Bâtisseurs",
            joinText: "Bâtissons l’avenir de l’Azuay ensemble. Je recherche des associés honnêtes, travailleurs et passionnés pour me rejoindre. Construisons une agence où l'éthique est le premier indicateur de performance.",
            joinCTA: "Rejoindre l'aventure"
        },
        ES: {
            title: "El Origen",
            subtitle: "Renacimiento & Compromiso",
            manifestoTitle: "El Manifiesto del Fundador",
            manifesto: "Mi trayectoria no es una línea recta, sino una serie de ciclos. De las agencias de publicidad de Bruselas a los proyectos de la Unión Europea, aprendí el rigor. Pero fue en Cuenca, a través de retos personales y empresariales, tras una experiencia poco convincente como restaurador, donde encontré mi verdadera misión: poner la IA al servicio de quienes más la necesitan.",
            piliers: [
                { title: "Anclaje Local", text: "Entendemos los desafíos y oportunidades de nuestra región. Somos su socio de IA de proximidad en el Azuay.", icon: MapPin, color: 'iaya-ocre' },
                { title: "Enfoque Humano", text: "Detrás de la tecnología, está el ser humano. Le escuchamos y le acompañamos en cada paso de su transformación.", icon: HeartHandshake, color: 'iaya-emerald' },
                { title: "Compromiso Comunitario", text: "Nos comprometemos a apoyar a las ONGs locales ofreciendo nuestras servicios a tarifas preferenciales para un impacto social positivo.", icon: Globe, color: 'iaya-ocre' }
            ],
            teamTitle: "El Equipo Híbrido",
            teamSubtitle: "Hybrid Intelligence",
            team: [
                { name: "DiayaVinci", role: "Visionaria Estética (Diseño & Psicología)" },
                { name: "TechBoss", role: "Guardián de Arquitectura & Estabilidad" },
                { name: "PromptAnty", role: "Lógica de Flujos e Interacciones" },
                { name: "Directorus", role: "Estratega de Negocios Orientado a Resultados" },
                { name: "n8nflow_king", role: "Maestro de Automatización & Workflows" },
                { name: "PromptGenius", role: "Poeta de la Precisión en LLMs" }
            ],
            joinTitle: "Llamado a los Constructores",
            joinText: "Construyamos juntos el futuro del Azuay. Busco socios honestos, trabajadores y apasionados para unirse a mí. Construyamos una agencia donde la ética sea el primer indicador de desempeño.",
            joinCTA: "Unirse a la aventura"
        },
        EN: {
            title: "The Origin",
            subtitle: "Renaissance & Commitment",
            manifestoTitle: "The Founder's Manifesto",
            manifesto: "My journey is not a straight line, but a series of cycles. From Brussels advertising agencies to European Union projects, I learned rigor. But it was in Cuenca, through personal and entrepreneurial challenges, following a lackluster experience as a restaurateur, that I found my true mission: putting AI at the service of those who need it most.",
            piliers: [
                { title: "Local Roots", text: "We understand the challenges and opportunities of our region. We are your local AI partner in Azuay.", icon: MapPin, color: 'iaya-ocre' },
                { title: "Human-Centric", text: "Behind the technology, there is a human being. We listen to you and accompany you through every step of your transformation.", icon: HeartHandshake, color: 'iaya-emerald' },
                { title: "Community Commitment", text: "We are committed to supporting local NGOs by offering our services at preferential rates for a positive social impact.", icon: Globe, color: 'iaya-ocre' }
            ],
            teamTitle: "The Hybrid Team",
            teamSubtitle: "Hybrid Intelligence",
            team: [
                { name: "DiayaVinci", role: "Aesthetic Visionary (Design & Psychology)" },
                { name: "TechBoss", role: "Guardian of Architecture & Stability" },
                { name: "PromptAnty", role: "Logician of Flows and Interactions" },
                { name: "Directorus", role: "Business Strategist Result-oriented" },
                { name: "n8nflow_king", role: "Master of Automation & Workflows" },
                { name: "PromptGenius", role: "Poet of LLM Precision" }
            ],
            joinTitle: "Call to Builders",
            joinText: "Let's build the future of Azuay together. I am looking for honest, hardworking, and passionate partners to join me. Let's build an agency where ethics is the primary indicator of performance.",
            joinCTA: "Join the adventure"
        }
    }[activeLang] || {
        title: "El Origen",
        subtitle: "Renacimiento & Compromiso",
        manifestoTitle: "El Manifiesto del Fundador",
        manifesto: "Mi trayectoria no es una línea recta, sino una serie de ciclos...",
        piliers: [],
        team: [],
        joinTitle: "",
        joinText: "",
        joinCTA: ""
    };

    return (
        <div className="min-h-screen bg-iaya-bg pt-32 pb-24 overflow-hidden relative">
            {/* Background Inca Stones Texture */}
            <div
                className="fixed inset-0 opacity-[0.02] pointer-events-none bg-repeat bg-[length:600px] z-0"
                style={{ backgroundImage: `url(${backgroundIncaStones})` }}
            />

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-outfit font-bold text-white tracking-tighter mb-4">
                        {content.title}
                    </h1>
                    <p className="text-iaya-ocre font-outfit text-xl uppercase tracking-widest font-medium">
                        {content.subtitle}
                    </p>
                </motion.div>

                {/* Grid Layout V2: Bento Logic */}
                <div className="grid grid-cols-12 gap-8 items-start">

                    {/* LEFT COLUMN: Narrative & Action (8/12) */}
                    <div className="col-span-12 lg:col-span-8 space-y-8">

                        {/* Manifesto Block: Bento-Double */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-12 md:p-16 rounded-[60px] bg-white/5 border border-white/10 backdrop-blur-3xl relative overflow-hidden"
                        >
                            <h2 className="text-4xl font-outfit font-bold text-white mb-8 flex items-center gap-3">
                                <Sparkles className="text-iaya-ocre w-8 h-8" />
                                {content.manifestoTitle}
                            </h2>
                            <div className="flex flex-col md:flex-row gap-12 items-center">
                                <div className="w-56 h-56 rounded-[40px] overflow-hidden flex-shrink-0 border-2 border-iaya-ocre/20 rotate-3 hover:rotate-0 transition-transform duration-700">
                                    <img src={joelImage} alt="Joel" className="w-full h-full object-cover grayscale brightness-110" />
                                </div>
                                <p className="text-white/80 font-inter text-2xl leading-relaxed italic font-light">
                                    "{content.manifesto}"
                                </p>
                            </div>
                        </motion.div>

                        {/* Llamado a los constructores: Large Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative group rounded-[60px] overflow-hidden border border-white/10 shadow-2xl min-h-[400px] flex items-center"
                        >
                            {/* Background Asset */}
                            <img
                                src={backgroundIncaStones}
                                alt="Inca Stones Background"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] desaturate-[0.5] sepia-[0.2]"
                            />
                            {/* Art Director Overlay */}
                            <div className="absolute inset-0 bg-[oklch(0.15_0.01_240_/_0.7)]" />

                            <div className="relative p-12 md:p-20 w-full">
                                <h3 className="text-4xl font-outfit font-bold text-white mb-8 tracking-tighter leading-none">
                                    {content.joinTitle}
                                </h3>
                                <p className="text-white/90 font-inter text-2xl leading-relaxed mb-12 max-w-2xl font-medium">
                                    {content.joinText}
                                </p>
                                <a
                                    href="#nexo"
                                    className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-iaya-ocre/60 text-[gainsboro] font-bold font-outfit text-xl hover:bg-white transition-all duration-500 hover:scale-105 backdrop-blur-sm"
                                >
                                    {content.joinCTA}
                                    <Zap className="w-6 h-6 fill-[gainsboro]" />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: Pillars Stack (4/12) */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                        {content.piliers.map((pilier, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-10 rounded-[50px] bg-white/5 border border-white/10 group hover:border-white/20 transition-all duration-500 backdrop-blur-md"
                            >
                                <div
                                    className="w-16 h-16 rounded-[24px] flex items-center justify-center mb-8 border transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                    style={{ borderColor: pilier.color, backgroundColor: `${pilier.color}10` }}
                                >
                                    <pilier.icon style={{ color: pilier.color }} className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-outfit font-bold text-white mb-4 tracking-tight">
                                    {pilier.title}
                                </h3>
                                <p className="text-white/60 font-inter text-lg leading-relaxed">
                                    {pilier.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Team Section - Repositioned Below */}
                    <div className="col-span-12 mt-32">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl md:text-7xl font-outfit font-bold text-white tracking-tighter mb-6">{content.teamTitle}</h2>
                            <p className="text-iaya-emerald font-outfit uppercase tracking-[0.4em] text-sm font-black">{content.teamSubtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {content.team.map((member, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="p-10 rounded-[40px] bg-iaya-nav border border-white/5 hover:border-iaya-emerald/30 transition-all group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-iaya-emerald/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-iaya-emerald/10 transition-all" />
                                    <h3 className="text-2xl font-outfit font-bold text-iaya-emerald mb-3 tracking-tight">{member.name}</h3>
                                    <p className="text-white/50 font-inter text-base italic">{member.role}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form Integration */}
                <div className="mt-32" id="nexo">
                    <NexoForm locale={activeLang} />
                </div>
            </div>
        </div>
    );
};

export default OrigenPage;
