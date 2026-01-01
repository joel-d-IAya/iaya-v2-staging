import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchProjects, getLocalizedContent, type Project, getAssetUrl } from '../services/api';

const TEXTS: Record<string, string> = {
    ES: 'Casos de Éxito',
    EN: 'Success Stories',
    FR: 'Cas de Réussite'
};

export default function PortfolioGrid({ locale }: { locale: string }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects().then(data => {
            setProjects(data);
            setLoading(false);
        });
    }, []);

    if (loading) return null;

    return (
        <section id="portfolio" className="py-32 bg-[oklch(12%_0.02_260)]">

            <div className="max-w-7xl mx-auto px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-xl">
                        <span className="text-iaya-turquoise font-outfit font-bold uppercase tracking-[0.3em] text-sm mb-6 block">Portfolio</span>
                        <h2 className="text-5xl sm:text-6xl font-outfit font-bold text-white tracking-tighter">
                            {TEXTS[locale] || TEXTS.ES}
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {projects.map((project, idx) => {
                        const content = getLocalizedContent(project, locale);
                        console.log("Rendering project:", project.id, "with lang:", locale, "found content:", !!content.title);
                        const title = content.title || "Untitled Project";
                        const summary = content.summary || "No description available";

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden mb-8 border border-white/5 bg-white/5">
                                    {project.image && (
                                        <img
                                            src={getAssetUrl(project.image)}
                                            alt=""
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        />
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech_stack?.map(tech => (
                                                <span key={tech} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] text-white/80 font-inter uppercase tracking-widest border border-white/5">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-outfit font-bold text-white mb-3 group-hover:text-iaya-turquoise transition-colors">
                                    {title}
                                </h3>
                                <p className="text-white/50 font-inter text-sm leading-relaxed line-clamp-2">
                                    {summary}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
