import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    fetchPortfolioBySlug,
    getLocalizedContent,
    getAssetUrl,
    getAccentColor,
    getContrastColor,
    type PortfolioItem
} from '../services/api';
import * as LucideIcons from 'lucide-react';
import NotFoundPage from './NotFoundPage';

const SIDEBAR_TEXTS: Record<string, any> = {
    ES: { challenge: 'El Desafío', solution: 'La Solución', builtWith: 'Construido con', metrics: 'Métricas & Resultados', back: 'Volver al Portafolio', live: 'Explorar Proyecto live', showcase: 'Galería del Proyecto', docs: 'Documentos del Proyecto' },
    EN: { challenge: 'The Challenge', solution: 'The Solution', builtWith: 'Built with', metrics: 'Metrics & Results', back: 'Back to Portfolio', live: 'Explore Live Project', showcase: 'Project Showcase', docs: 'Project Documents' },
    FR: { challenge: 'Le Défi', solution: 'La Solution', builtWith: 'Réalisé avec', metrics: 'Métriques & Résultats', back: 'Retour au Portafolio', live: 'Explorer le Projet', showcase: 'Galerie du Projet', docs: 'Documents du Projet' }
};

export default function PortfolioDetailPage({ activeLang }: { activeLang: string }) {
    const { slug } = useParams<{ slug: string }>();
    const [item, setItem] = useState<PortfolioItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const t = SIDEBAR_TEXTS[activeLang] || SIDEBAR_TEXTS.ES;

    useEffect(() => {
        if (slug) {
            fetchPortfolioBySlug(slug).then(data => {
                setItem(data);
                setLoading(false);
            });
        }
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen bg-iaya-bg flex items-center justify-center">
            <div className="animate-pulse text-2xl font-black italic text-white font-outfit uppercase tracking-widest">IAya Loading...</div>
        </div>
    );

    if (!item) return <NotFoundPage activeLang={activeLang} />;

    const content = getLocalizedContent(item, activeLang);
    const accentColor = getAccentColor(item.accent_color);
    const textColor = getContrastColor(item.accent_color) === 'black' ? 'text-black' : 'text-white';

    // Separate images and files
    const images = item.files?.filter(f => f.type?.startsWith('image/')) || [];
    const documents = item.files?.filter(f => !f.type?.startsWith('image/')) || [];

    return (
        <div className="min-h-screen bg-iaya-bg pt-32 pb-24">

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-8 cursor-zoom-out"
                    >
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            src={getAssetUrl(selectedImage)}
                            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                        />
                        <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                            <LucideIcons.X size={32} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-8">

                {/* Back Link */}
                <Link
                    to="/portafolio"
                    className="inline-flex items-center gap-3 text-white/30 hover:text-white transition-colors mb-16 font-outfit font-bold uppercase tracking-widest text-xs group"
                >
                    <div className="w-8 h-[1px] bg-white/20 group-hover:bg-white transition-all" />
                    {t.back}
                </Link>

                <div className="space-y-32">
                    {/* Level 1: Title (Full Width) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center lg:text-left"
                    >
                        <h1 className="text-4xl sm:text-6xl xl:text-7xl font-outfit font-bold text-white tracking-tighter leading-none bg-gradient-to-br from-white via-white to-white/20 bg-clip-text text-transparent">
                            {content.title}
                        </h1>
                    </motion.div>

                    {/* Level 2: Core Details (3 Columns) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        {/* Left: Main Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="aspect-square rounded-[40px] overflow-hidden border border-white/10 bg-white/5 shadow-2xl relative group"
                        >
                            {item.main_image && (
                                <img
                                    src={getAssetUrl(item.main_image)}
                                    alt={content.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </motion.div>

                        {/* Center: Excerpt */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col justify-center h-full gap-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-1 bg-iaya-orange rounded-full" />
                                <span className="text-[10px] font-outfit font-bold uppercase tracking-[0.4em] text-iaya-orange">Contexto</span>
                            </div>
                            <p className="text-white/60 font-inter text-xl sm:text-2xl leading-relaxed italic">
                                "{content.excerpt}"
                            </p>
                        </motion.div>

                        {/* Right: Service Box & CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-8"
                        >
                            <div>
                                <h2 className="text-[10px] font-outfit font-bold uppercase tracking-[0.4em] text-white/30 mb-8 border-b border-white/5 pb-4">{t.builtWith}</h2>
                                <div className="flex flex-wrap gap-3">
                                    {item.sub_services?.map((svc: any) => (
                                        <Link
                                            key={svc.id}
                                            to={`/servicios/${svc.slug}`}
                                            className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-outfit font-bold text-white/70 hover:bg-white hover:text-black transition-all"
                                        >
                                            {getLocalizedContent(svc, activeLang).title || svc.internal_name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {item.related_url && (
                                <a
                                    href={item.related_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-outfit font-bold uppercase tracking-[0.2em] text-xs transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] ${textColor}`}
                                    style={{ backgroundColor: accentColor }}
                                >
                                    {t.live}
                                    <LucideIcons.ExternalLink size={16} />
                                </a>
                            )}
                        </motion.div>
                    </div>

                    {/* Level 3: Narrative & Results (3 Columns) */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:gap-20">
                        {/* Left: Challenge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-px bg-white/30" />
                                <h2 className="text-[10px] font-outfit font-bold uppercase tracking-[0.4em] text-white/40">{t.challenge}</h2>
                            </div>
                            <div
                                className="prose prose-invert prose-lg text-white/70 font-inter leading-relaxed max-w-none"
                                dangerouslySetInnerHTML={{ __html: content.challenge || '' }}
                            />
                        </motion.div>

                        {/* Center: Solution */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-px bg-white/30" />
                                <h2 className="text-[10px] font-outfit font-bold uppercase tracking-[0.4em] text-white/40">{t.solution}</h2>
                            </div>
                            <div
                                className="prose prose-invert prose-lg text-white/70 font-inter leading-relaxed max-w-none border-l border-white/5 pl-8"
                                dangerouslySetInnerHTML={{ __html: content.solution || '' }}
                            />
                        </motion.div>

                        {/* Right: Metrics */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-px bg-white/30" />
                                <h2 className="text-[10px] font-outfit font-bold uppercase tracking-[0.4em] text-white/40">{t.metrics}</h2>
                            </div>
                            <div className="prose prose-invert prose-lg text-white/70 font-inter leading-relaxed max-w-none border-l border-white/5 pl-8 whitespace-pre-line">
                                {content.results_metrics}
                            </div>
                        </motion.div>
                    </div>

                    {/* Additional Content: Gallery & Downloads */}
                    <div className="pt-32 space-y-32">
                        {/* Gallery Module */}
                        {images.length > 0 && (
                            <div>
                                <h3 className="text-xs font-outfit font-bold uppercase tracking-[0.4em] text-white/40 mb-12 flex items-center gap-4">
                                    <LucideIcons.Image size={14} className="text-iaya-turquoise" />
                                    {t.showcase}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    {images.map((img, i) => (
                                        <motion.div
                                            key={img.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => setSelectedImage(img.id)}
                                            className="relative aspect-video lg:aspect-[3/2] rounded-3xl overflow-hidden cursor-zoom-in border border-white/5 bg-white/5 shadow-xl group"
                                        >
                                            <img
                                                src={getAssetUrl(img.id)}
                                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Downloads Module */}
                        {documents.length > 0 && (
                            <div>
                                <h3 className="text-xs font-outfit font-bold uppercase tracking-[0.4em] text-white/40 mb-12 flex items-center gap-4">
                                    <LucideIcons.FileText size={14} className="text-iaya-turquoise" />
                                    {t.docs}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {documents.map((doc, i) => (
                                        <motion.a
                                            key={doc.id}
                                            href={getAssetUrl(doc.id)}
                                            download
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-center gap-5 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
                                        >
                                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-iaya-bg border border-white/10 text-white/40 group-hover:text-iaya-turquoise transition-colors">
                                                <LucideIcons.File size={24} />
                                            </div>
                                            <div className="flex flex-col overflow-hidden">
                                                <span className="text-white/80 font-outfit font-bold text-sm truncate">{doc.title || doc.filename_download}</span>
                                                <span className="text-white/30 font-inter text-[10px] uppercase tracking-widest">Download File</span>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
