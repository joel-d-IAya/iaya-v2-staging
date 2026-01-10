import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchRecreo, getLocalizedContent, type RecreoItem } from '../services/api';

export default function RecreoPage({ activeLang }: { activeLang: string }) {
    const [recreo, setRecreo] = useState<RecreoItem[]>([]);
    const [loading, setLoading] = useState(true);

    const titles: Record<string, string> = {
        ES: 'Espacio Recreo',
        EN: 'Recreo Space',
        FR: 'Espace Récréation'
    };

    useEffect(() => {
        fetchRecreo().then(data => {
            setRecreo(data);
            setLoading(false);
        });
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-iaya-bg flex items-center justify-center">
            <div className="animate-pulse text-2xl font-black italic text-white font-outfit uppercase">IAya Recreo...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-iaya-bg pt-40 pb-24 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-iaya-orange/5 rounded-full blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-6xl md:text-8xl font-outfit font-bold text-white tracking-tighter mb-6">
                        {titles[activeLang] || titles.ES}
                    </h1>
                    <p className="text-white/40 font-inter text-xl max-w-2xl mx-auto leading-relaxed italic">
                        {activeLang === 'ES' && "Anécdotas, experimentos y visiones sobre el futuro de la Inteligencia Artificial."}
                        {activeLang === 'EN' && "Anecdotes, experiments, and visions about the future of Artificial Intelligence."}
                        {activeLang === 'FR' && "Anecdotes, expériences et visions sur le futur de l'Intelligence Artificielle."}
                    </p>
                </motion.div>

                {recreo.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recreo.map((item, idx) => {
                            const content = getLocalizedContent(item, activeLang);
                            const videoId = item.youtube_id || item.video_url?.split('v=')[1]?.split('&')[0];

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group"
                                >
                                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl mb-6">
                                        {videoId ? (
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                src={`https://www.youtube.com/embed/${videoId}`}
                                                title={content.title || "IAya Recreo"}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                                className="group-hover:scale-[1.02] transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/20">
                                                Video No Disponible
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-outfit font-bold text-white mb-2 group-hover:text-iaya-orange transition-colors">
                                        {content.title || "Episodio sin título"}
                                    </h3>
                                    <p className="text-white/50 font-inter text-sm leading-relaxed line-clamp-2">
                                        {content.recreo_content || content.description || ""}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                            <div className="w-3 h-3 rounded-full bg-iaya-orange animate-ping" />
                        </div>
                        <p className="text-white/40 font-outfit font-bold uppercase tracking-widest">
                            {activeLang === 'ES' && "Sintonizando nuevas frecuencias..."}
                            {activeLang === 'EN' && "Tuning into new frequencies..."}
                            {activeLang === 'FR' && "Synchronisation des nouvelles fréquences..."}
                        </p>
                        <p className="text-white/20 font-inter text-sm mt-4">
                            (API Permission Check: 403 Forbidden)
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
