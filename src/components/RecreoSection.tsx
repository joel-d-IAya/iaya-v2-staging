import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { fetchRecreo, getAssetUrl, type RecreoItem } from '../services/api';
import { Play, Download, Headphones } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface RecreoSectionProps {
    locale: string;
}

const TEXTS: Record<string, { title: string, intro: string }> = {
    ES: { title: 'Espacio RECREO', intro: 'APRENDER DE MANERA DIFERENTE' },
    EN: { title: 'RECREO Space', intro: 'LEARNING IN A DIFFERENT WAY' },
    FR: { title: 'Espace RECREO', intro: 'APPRENDRE DE MANIÈRE DIFFÉRENTE' }
};

export default function RecreoSection({ locale }: RecreoSectionProps) {
    const t = TEXTS[locale] || TEXTS.ES;
    const [, setRecreo] = useState<RecreoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState<RecreoItem | null>(null);
    const [playingPodcast, setPlayingPodcast] = useState<string | null>(null);

    useEffect(() => {
        fetchRecreo().then(data => {
            setRecreo(data);
            if (data.length > 0) {
                // Tirage au sort
                const random = data[Math.floor(Math.random() * data.length)];
                setSelectedItem(random);
            }
            setLoading(false);
        });
    }, []);

    const title = selectedItem?.title || 'El Recreo';
    const videoId = selectedItem?.video_id;

    const podcastFiles = useMemo(() => {
        if (!selectedItem) return null;
        return {
            ES: getAssetUrl(selectedItem.podcast_es),
            FR: getAssetUrl(selectedItem.podcast_fr),
            EN: getAssetUrl(selectedItem.podcast_en)
        };
    }, [selectedItem]);

    const handleDownload = (lang: 'ES' | 'FR' | 'EN') => {
        const url = podcastFiles?.[lang];
        if (url) window.open(url + '&download', '_blank');
    };

    const togglePlay = (lang: 'ES' | 'FR' | 'EN') => {
        const url = podcastFiles?.[lang];
        if (!url) return;

        console.log("Audio Source (Section):", url);

        if (playingPodcast === url) {
            setPlayingPodcast(null);
        } else {
            setPlayingPodcast(url);
        }
    };

    if (loading) return (
        <section className="py-24 bg-iaya-bg flex items-center justify-center">
            <div className="animate-pulse text-iaya-orange font-outfit font-black italic">IAYA RECREO...</div>
        </section>
    );

    return (
        <section id="recreo" className="py-32 recreo-bg relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <SectionHeader
                    intro={t.intro}
                    title={t.title}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side: Content & Podcast */}
                    <div className="space-y-8">
                        <div>
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="text-3xl md:text-5xl font-outfit font-bold text-white mb-6 tracking-tighter"
                            >
                                {title}
                            </motion.h3>
                        </div>

                        {/* Podcast Module - Glassmorphism 2.0 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="glass-2 rounded-[2rem] p-8 md:p-10 relative overflow-hidden group"
                        >
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-iaya-orange flex items-center justify-center shadow-[0_0_30px_rgba(var(--color-iaya-orange),0.3)]">
                                    <Headphones className="text-white w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="text-white font-outfit font-bold text-xl uppercase tracking-tighter">Podcast Edition</h4>
                                    <p className="text-white/40 text-sm font-inter">Selecciona tu idioma para escuchar</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {(['ES', 'FR', 'EN'] as const).map((lang) => (
                                    <div key={lang} className="flex flex-col gap-2">
                                        <button
                                            onClick={() => togglePlay(lang)}
                                            disabled={!podcastFiles?.[lang]}
                                            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300 border border-white/5 ${podcastFiles?.[lang]
                                                ? (playingPodcast === podcastFiles[lang]
                                                    ? 'bg-iaya-orange/30 border-iaya-orange/50'
                                                    : 'bg-white/5 hover:bg-iaya-orange/20 hover:border-iaya-orange/30') + ' group/btn'
                                                : 'opacity-20 cursor-not-allowed'
                                                }`}
                                        >
                                            <span className={`font-outfit font-bold text-lg ${podcastFiles?.[lang] ? 'text-white' : 'text-white/40'}`}>
                                                {lang}
                                            </span>
                                            {playingPodcast === podcastFiles?.[lang] ? (
                                                <div className="flex gap-1 items-end h-4 mb-1">
                                                    <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-iaya-orange" />
                                                    <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }} className="w-1 bg-iaya-orange" />
                                                    <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="w-1 bg-iaya-orange" />
                                                </div>
                                            ) : (
                                                <Play size={18} fill={podcastFiles?.[lang] ? "currentColor" : "none"} className={podcastFiles?.[lang] ? 'text-iaya-turquoise' : ''} />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => handleDownload(lang)}
                                            disabled={!podcastFiles?.[lang]}
                                            className={`flex items-center justify-center gap-2 py-2 rounded-xl transition-all border border-white/5 text-[10px] font-outfit font-bold uppercase tracking-widest ${podcastFiles?.[lang]
                                                ? 'bg-white/2 hover:bg-white/10 hover:text-iaya-turquoise text-white/60'
                                                : 'opacity-10 cursor-not-allowed text-white/20'
                                                }`}
                                        >
                                            <Download size={10} />
                                            <span>MP3</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="pt-4 flex justify-start">
                            <a
                                href="/recreo"
                                className="group flex items-center gap-3 text-white/40 font-outfit font-bold uppercase tracking-widest text-xs hover:text-white transition-colors"
                            >
                                <div className="w-8 h-[1px] bg-white/10 group-hover:w-12 group-hover:bg-iaya-orange transition-all" />
                                Ver todo el hub
                            </a>
                        </div>
                    </div>

                    {/* Right Side: Video/Thumbnail */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 group bg-black/40"
                    >
                        {/* Audio Player (Hidden control, dynamic source) */}
                        {playingPodcast && (
                            <audio
                                key={playingPodcast}
                                src={playingPodcast}
                                autoPlay
                                controls
                                className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[80%] opacity-80 hover:opacity-100 transition-opacity rounded-full h-10"
                                onEnded={() => setPlayingPodcast(null)}
                            />
                        )}
                        {videoId ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                                title={title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        ) : selectedItem?.infographic_hor ? (
                            <img
                                src={getAssetUrl(selectedItem.infographic_hor)}
                                alt={title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-white/20 font-outfit uppercase tracking-widest">IAya Visual</span>
                            </div>
                        )}

                        {/* Shadow Gradient for legibility if needed */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.div>
                </div>
            </div>

            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,100,50,0.03)_0%,transparent_70%)] -z-10" />
        </section>
    );
}
