import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchAllNews, getLocalizedContent, type NewsItem, getUiLabels, getAssetUrl, toSlug } from '../services/api';
import { Link } from 'react-router-dom';

const TEXTS: Record<string, { title: string, subtitle: string, back: string }> = {
    ES: { title: 'PULSE / NOTICIAS', subtitle: 'Archivo completo de noticias IA', back: 'Regresar' },
    EN: { title: 'PULSE / NEWS', subtitle: 'Complete AI news archive', back: 'Back' },
    FR: { title: 'PULSE / ACTUALITÉS', subtitle: 'Archive complète des actualités IA', back: 'Retour' }
};

const TimePill = ({ date, locale }: { date: string, locale: string }) => {
    const labels = getUiLabels(locale);
    const d = new Date(date);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = d.toDateString() === yesterday.toDateString();

    const text = isToday ? labels.today : isYesterday ? labels.yesterday : d.toLocaleDateString(locale, { day: '2-digit', month: 'short' });

    return (
        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] text-white font-bold uppercase tracking-wider">
            {text}
        </span>
    );
};

const cleanMarkdown = (text: string | undefined): string => {
    if (!text) return '';
    return text
        .replace(/#+\s?/g, '')
        .replace(/\*\*/g, '')
        .trim();
};

export default function NewsPage({ activeLang }: { activeLang: string }) {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const labels = getUiLabels(activeLang);
    const t = TEXTS[activeLang] || TEXTS.ES;

    useEffect(() => {
        fetchAllNews().then(data => {
            setNews(data);
            setLoading(false);
        });
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-iaya-bg flex items-center justify-center">
            <div className="animate-pulse text-2xl font-black italic text-white">IAya Pulse...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-iaya-bg pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-8">
                <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-iaya-orange transition-colors mb-12 font-outfit font-bold uppercase tracking-widest text-xs">
                    ← {t.back}
                </Link>

                <header className="mb-20">
                    <h1 className="text-5xl sm:text-7xl font-outfit font-bold text-white tracking-tighter mb-4">
                        {t.title}
                    </h1>
                    <p className="text-white/40 font-inter text-lg">{t.subtitle}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    {news.map((item, idx) => {
                        const content = getLocalizedContent(item, activeLang);
                        const title = content.title || "Untitled News";
                        const fullContentSource = content.full_content || content.content || "";
                        const summary = cleanMarkdown(fullContentSource).substring(0, 150) + '...';
                        const slug = content.slug || item.slug || (content.title ? toSlug(content.title) : item.id);

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: (idx % 3) * 0.1 }}
                                viewport={{ once: true }}
                                className="col-span-1 md:col-span-4 group cursor-pointer"
                                onClick={() => window.location.href = `/news/${slug}`}
                            >
                                <div className="relative aspect-square rounded-[24px] overflow-hidden border border-white/10 bg-white/5 mb-6">
                                    {item.image && (
                                        <img
                                            src={getAssetUrl(item.image)}
                                            alt=""
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-6 left-6">
                                        <TimePill date={item.publish_date} locale={activeLang} />
                                    </div>
                                </div>
                                <div className="relative">
                                    <h2 className="text-xl font-outfit font-bold text-white mb-4 line-clamp-2 group-hover:text-iaya-orange transition-colors">
                                        {title}
                                    </h2>
                                    <p className="text-white/50 font-inter text-sm leading-relaxed line-clamp-3 mb-6">
                                        {summary}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-iaya-orange font-outfit font-bold text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                                        {labels.readMore}
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
