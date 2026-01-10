import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';
import joelImage from '../assets/joel.png';

interface AboutSectionProps {
    locale: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ locale }) => {
    const content = {
        FR: {
            title: "Une agence d’IA différente. Fièrement basée à Cuenca.",
            subtitle: "De Bruxelles à l'Azuay, l'artisanat numérique au service de l'humain et de sa communauté.",
            body: "Après 20 ans de stratégie numérique en Europe, j’ai choisi Cuenca pour fonder IAya. Plus qu’une agence, c’est un engagement : rendre la technologie IA utile, bénéficiable et accessible à notre région. Ici, nous ne vendons pas de magie, nous construisons des outils de proximité avec un regard humain.",
            impact: "Notre technologie a du cœur. Nous croyons en un impact local positif. IAya soutient activement le tissu associatif de l'Azuay en offrant des tarifs préférentiels aux ONGs locales.",
            cta: "Découvrir notre histoire"
        },
        ES: {
            title: "Una agencia de IA diferente. Orgullosamente basados en Cuenca.",
            subtitle: "De Bruselas a la Azuay, artesanía digital al servicio del ser humano y de su comunidad.",
            body: "Tras 20 años de estrategia digital en Europa, elegí Cuenca para fundar IAya. Más que una agencia, es un compromiso: hacer la tecnología IA útil, beneficiosa y accesible para nuestra región. Aquí no vendemos magia, construimos herramientas de proximidad con una mirada humana.",
            impact: "Nuestra tecnología tiene corazón. Creemos en un impacto local positivo. IAya apoya activamente al tejido asociativo del Azuay ofreciendo tarifas preferenciales a las ONGs locales.",
            cta: "Descubrir nuestra historia"
        },
        EN: {
            title: "A different kind of AI agency. Proudly based in Cuenca.",
            subtitle: "From Brussels to Azuay, digital craftsmanship serving humans and their community.",
            body: "After 20 years of digital strategy in Europe, I chose Cuenca to found IAya. More than an agency, it's a commitment: making AI technology useful, beneficial, and accessible to our region. Here, we don't sell magic; we build proximity tools with a human touch.",
            impact: "Our technology has a heart. We believe in a positive local impact. IAya actively supports Azuay's non-profit sector by offering preferential rates to local NGOs.",
            cta: "Discover our story"
        }
    }[locale] || {
        title: "Una agencia de IA diferente. Orgullosamente basados en Cuenca.",
        subtitle: "De Bruselas a la Azuay, artesanía digital al servicio del ser humano y de su comunidad.",
        body: "Tras 20 años de estrategia digital en Europa, elegí Cuenca para fundar IAya. Más que una agencia, es un compromiso: hacer la tecnología IA útil, beneficiosa y accesible para nuestra región. Aquí no vendemos magia, construimos herramientas de proximidad con una mirada humana.",
        impact: "Nuestra tecnología tiene corazón. Creemos en un impacto local positivo. IAya apoya activamente al tejido asociativo del Azuay ofreciendo tarifas preferenciales a las ONGs locales.",
        cta: "Descubrir nuestra historia"
    };

    return (
        <section id="origen" className="py-24 bg-iaya-bg overflow-hidden">
            <div className="max-w-7xl mx-auto px-8">
                {/* Bento Grid Header */}
                <div className="grid grid-cols-12 gap-8 items-stretch mb-8">
                    {/* Text Block - 60% */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="col-span-12 lg:col-span-7 flex flex-col justify-center p-12 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group"
                    >
                        {/* Decorative Gradient */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-iaya-ocre/10 rounded-full blur-[100px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-iaya-ocre/20" />

                        <h2 className="text-4xl lg:text-5xl font-outfit font-bold text-white mb-6 tracking-tighter leading-[1.1]">
                            {content.title}
                        </h2>
                        <h3 className="text-xl lg:text-2xl font-outfit text-iaya-ocre mb-8 font-medium italic opacity-90 leading-relaxed">
                            {content.subtitle}
                        </h3>
                        <p className="text-white/60 font-inter text-lg leading-relaxed mb-10 max-w-2xl">
                            {content.body}
                        </p>

                        <div>
                            <a
                                href="/origen"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-iaya-ocre/10 hover:bg-iaya-ocre/20 border border-iaya-ocre/30 rounded-full text-iaya-ocre font-outfit font-bold transition-all duration-300 group"
                            >
                                {content.cta}
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                >
                                    →
                                </motion.span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Image Block - 40% */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="col-span-12 lg:col-span-5 rounded-[40px] overflow-hidden relative group min-h-[500px]"
                    >
                        <img
                            src={joelImage}
                            alt="Joel Devalez"
                            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-iaya-bg via-transparent to-transparent opacity-60" />

                        {/* Glass Overlay Tag */}
                        <div className="absolute bottom-10 left-10 right-10 p-6 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <p className="text-white font-outfit font-bold tracking-tighter">Joel Devalez</p>
                            <p className="text-iaya-ocre/80 text-sm font-inter">Founder & Creative Director</p>
                        </div>
                    </motion.div>
                </div>

                {/* Social Impact Ribbon - Full Width */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="p-8 lg:p-12 rounded-[40px] bg-gradient-to-r from-iaya-emerald/10 via-iaya-emerald/5 to-transparent border border-iaya-emerald/20 flex flex-col lg:flex-row items-center gap-8 lg:gap-16"
                >
                    <div className="flex-shrink-0 w-20 h-20 rounded-full bg-iaya-emerald/20 flex items-center justify-center border border-iaya-emerald/30 shadow-[0_0_30px_rgba(112,255,160,0.1)]">
                        <HeartHandshake className="text-iaya-emerald w-10 h-10" />
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                        <h4 className="text-iaya-emerald font-outfit font-bold uppercase tracking-[0.2em] text-sm mb-3">Impact Social Local</h4>
                        <p className="text-white/80 font-inter text-lg lg:text-xl leading-relaxed">
                            {content.impact}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
