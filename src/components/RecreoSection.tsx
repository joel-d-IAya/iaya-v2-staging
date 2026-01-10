import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchRecreo, getLocalizedContent, type RecreoItem } from '../services/api';


export default function RecreoSection({ locale }: { locale: string }) {
    const [recreo, setRecreo] = useState<RecreoItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecreo().then(data => {
            setRecreo(data);
            setLoading(false);
        });
    }, []);

    const item = recreo[0];
    const content = item ? getLocalizedContent(item, locale) : null;

    const title = content?.title || 'El Recreo';
    const description = content?.recreo_content || content?.description || content?.summary || 'Explora nuestras anécdotas y experimentos con Inteligencia Artificial.';
    const videoId = item?.youtube_id || item?.video_url?.split('v=')[1]?.split('&')[0];

    return (
        <section id="recreo" className="py-24 bg-iaya-bg relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-iaya-orange/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <motion.h2 className="text-5xl font-outfit font-bold text-white mb-4">El Recreo</motion.h2>
                        <p className="text-white/40">Cargando experiencias...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-iaya-orange font-outfit font-bold uppercase tracking-[0.3em] text-sm mb-6 block"
                            >
                                El Recreo
                            </motion.span>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-5xl sm:text-6xl font-outfit font-bold text-white mb-8 tracking-tighter"
                            >
                                {title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-white/60 font-inter text-lg leading-relaxed mb-10 max-w-xl"
                            >
                                {description}
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 group"
                        >
                            {videoId ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="group-hover:scale-[1.02] transition-transform duration-700"
                                />
                            ) : (
                                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                                    <span className="text-white/20">Video no disponible</span>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
}
