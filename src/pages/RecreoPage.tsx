import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRecreo, getAssetUrl, type RecreoItem } from '../services/api';
import { Play, Download, Headphones, ArrowLeft, ArrowRight, X } from 'lucide-react';

export default function RecreoPage({ activeLang }: { activeLang: string }) {
    const [recreo, setRecreo] = useState<RecreoItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        fetchRecreo().then(data => {
            setRecreo(data);
            setLoading(false);
        });
    }, []);

    const selectedItem = useMemo(() =>
        recreo.find(item => Number(item.id) === selectedId) || null
        , [selectedId, recreo]);

    const currentIndex = useMemo(() =>
        recreo.findIndex(item => Number(item.id) === selectedId)
        , [selectedId, recreo]);

    const nextItem = () => {
        if (currentIndex < recreo.length - 1) {
            setSelectedId(Number(recreo[currentIndex + 1].id));
        }
    };

    const prevItem = () => {
        if (currentIndex > 0) {
            setSelectedId(Number(recreo[currentIndex - 1].id));
        }
    };

    const introduction = {
        ES: "Anécdotas, experimentos y visiones sobre el futuro de la Inteligencia Artificial.",
        EN: "Anecdotes, experiments, and visions about the future of Artificial Intelligence.",
        FR: "Anecdotes, expériences et visions sur le futur de l'Intelligence Artificielle."
    };

    const titles = {
        ES: "Espacio Recreo",
        EN: "Recreo Space",
        FR: "Espace Récréation"
    };

    if (loading) return (
        <div className="min-h-screen bg-iaya-bg flex items-center justify-center">
            <div className="animate-pulse text-2xl font-black italic text-iaya-orange font-outfit uppercase">IAya Recreo...</div>
        </div>
    );

    return (
        <div className="min-h-screen recreo-bg relative overflow-hidden">
            {/* Global Overlay for depth */}
            <div className="fixed inset-0 bg-iaya-bg/60 backdrop-blur-[2px] -z-10" />

            <main className="pt-32 pb-24 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen">
                <AnimatePresence mode="wait">
                    {!selectedId ? (
                        /* --- PAGE MÈRE: LE HUB BENTO --- */
                        <motion.div
                            key="hub"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-12"
                        >
                            {/* Header Section */}
                            <header className="max-w-4xl">
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-iaya-orange font-outfit font-bold uppercase tracking-[0.4em] text-xs mb-4 block"
                                >
                                    Concept V2.0
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-6xl md:text-8xl font-outfit font-bold text-white tracking-tighter mb-6"
                                >
                                    {titles[activeLang as keyof typeof titles] || titles.ES}
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-white/60 font-inter text-xl md:text-2xl leading-relaxed max-w-2xl italic"
                                >
                                    {introduction[activeLang as keyof typeof introduction] || introduction.ES}
                                </motion.p>
                            </header>

                            {/* Bento Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8 auto-rows-[250px] md:auto-rows-[300px]">
                                {recreo.map((item, idx) => {
                                    // Logic for featured items: Items 0 and 1 are 2x2 on desktop
                                    const isFeatured = idx < 2;
                                    const gridClass = isFeatured
                                        ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
                                        : "col-span-2 row-span-1 md:col-span-1 md:row-span-1";

                                    return (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                            viewport={{ once: true }}
                                            onClick={() => setSelectedId(Number(item.id))}
                                            className={`${gridClass} relative group cursor-pointer rounded-[2rem] overflow-hidden border border-white/10 glass-2 transition-all duration-500 hover:border-iaya-orange/40 hover:shadow-[0_0_40px_rgba(var(--color-iaya-orange),0.1)]`}
                                        >
                                            {/* Image Layer */}
                                            <div className="absolute inset-0">
                                                <img
                                                    src={getAssetUrl(item.infographic_square ? item.infographic_square : item.infographic_hor) + '&format=webp'}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000"
                                                />
                                                {/* APCA Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                            </div>

                                            {/* Content Overlay */}
                                            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                                                <span className="text-iaya-orange font-outfit font-bold text-[10px] uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                                                    Explorar Cápsula
                                                </span>
                                                <h3 className={`text-white font-outfit font-bold tracking-tight leading-none ${isFeatured ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl'}`}>
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ) : (
                        /* --- PAGE DÉDIÉE: L'EXPÉRIENCE IMMERSIVE --- */
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            className="space-y-12"
                        >
                            {/* Navigation Bar Detail */}
                            <div className="flex items-center justify-between mb-8">
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="group flex items-center gap-4 text-white/50 hover:text-white transition-colors"
                                >
                                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white/5 group-hover:border-iaya-orange/50 transition-all">
                                        <X size={20} />
                                    </div>
                                    <span className="font-outfit font-bold uppercase tracking-widest text-xs">Cerrar</span>
                                </button>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={prevItem}
                                        disabled={currentIndex === 0}
                                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center disabled:opacity-20 hover:bg-white/5 transition-colors"
                                    >
                                        <ArrowLeft size={20} />
                                    </button>
                                    <span className="font-outfit font-bold text-white/20 text-sm">
                                        {currentIndex + 1} / {recreo.length}
                                    </span>
                                    <button
                                        onClick={nextItem}
                                        disabled={currentIndex === recreo.length - 1}
                                        className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center disabled:opacity-20 hover:bg-white/5 transition-colors"
                                    >
                                        <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Video Player */}
                            <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)] bg-black">
                                {selectedItem?.video_id ? (
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${selectedItem.video_id}?autoplay=1&rel=0`}
                                        title={selectedItem.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <img
                                            src={getAssetUrl(selectedItem?.infographic_hor) + '&format=webp'}
                                            className="w-full h-full object-cover opacity-50"
                                            alt={selectedItem?.title}
                                        />
                                        <p className="absolute text-white/40 font-outfit uppercase tracking-widest">Contenido Visual</p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                {/* Info & Podcast */}
                                <div className="lg:col-span-2 space-y-8">
                                    <h2 className="text-4xl md:text-6xl font-outfit font-bold text-white tracking-tighter">
                                        {selectedItem?.title}
                                    </h2>

                                    {/* Podcast Module UI */}
                                    <div className="glass-2 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
                                        <div className="flex flex-col md:flex-row items-center gap-8">
                                            <div className="w-24 h-24 rounded-3xl bg-iaya-orange flex items-center justify-center shadow-[0_0_40px_rgba(var(--color-iaya-orange),0.4)] flex-shrink-0 animate-pulse">
                                                <Headphones className="text-white w-12 h-12" />
                                            </div>
                                            <div className="text-center md:text-left">
                                                <h4 className="text-white font-outfit font-bold text-2xl uppercase tracking-tighter mb-2">Podcast Sync</h4>
                                                <p className="text-white/40 font-inter mb-6">Escucha esta cápsula en tu idioma nativo para una inmersión cognitiva total.</p>

                                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                                    {[
                                                        { code: 'ES', label: 'Castellano', file: selectedItem?.podcast_es },
                                                        { code: 'FR', label: 'Français', file: selectedItem?.podcast_fr },
                                                        { code: 'EN', label: 'English', file: selectedItem?.podcast_en }
                                                    ].map((lang) => (
                                                        <div
                                                            key={lang.code}
                                                            className={`flex items-center bg-white/5 border border-white/10 rounded-full transition-all group/pod ${lang.file ? 'hover:border-iaya-orange/30' : 'opacity-20 grayscale'}`}
                                                        >
                                                            <button
                                                                onClick={() => lang.file && window.open(getAssetUrl(lang.file), '_blank')}
                                                                disabled={!lang.file}
                                                                className={`flex items-center gap-3 pl-6 pr-4 py-3 font-outfit font-bold uppercase text-[10px] tracking-[0.2em] transition-all ${lang.file
                                                                    ? 'text-white hover:text-iaya-orange'
                                                                    : 'cursor-not-allowed'
                                                                    }`}
                                                            >
                                                                <Play size={12} fill={lang.file ? "currentColor" : "none"} />
                                                                {lang.label}
                                                            </button>
                                                            <div className="w-[1px] h-4 bg-white/10" />
                                                            <button
                                                                onClick={() => lang.file && window.open(getAssetUrl(lang.file) + '&download', '_blank')}
                                                                disabled={!lang.file}
                                                                className={`px-4 py-3 transition-all ${lang.file
                                                                    ? 'text-white/40 hover:text-iaya-turquoise'
                                                                    : 'cursor-not-allowed'
                                                                    }`}
                                                                title="Download MP3"
                                                            >
                                                                <Download size={14} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Adaptive Infographic Side Column */}
                                <div className="space-y-6">
                                    <div className="glass-2 rounded-[2rem] p-4 group overflow-hidden border border-iaya-turquoise/20">
                                        <span className="block text-iaya-turquoise font-outfit font-bold uppercase tracking-[0.3em] text-[10px] mb-4 text-center">IAya Infographic Insight</span>
                                        <picture className="block rounded-2xl overflow-hidden shadow-2xl">
                                            <source
                                                media="(min-width: 1024px)"
                                                srcSet={getAssetUrl(selectedItem?.infographic_vert) + '&format=webp'}
                                            />
                                            <img
                                                src={getAssetUrl(selectedItem?.infographic_hor) + '&format=webp'}
                                                alt="Infographic Analysis"
                                                className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </picture>
                                    </div>

                                    <div className="p-8 rounded-[2rem] border border-white/5 bg-white/2">
                                        <p className="text-white/30 font-inter text-sm italic leading-relaxed">
                                            "El futuro no es algo que sucede, es algo que diseñamos. Cada cápsula del Espacio Recreo es un fragmento de esa visión."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
