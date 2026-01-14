import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllNews, getLocalizedContent, type NewsItem, getAssetUrl, getUiLabels, toSlug } from '../services/api';
import NotFoundPage from './NotFoundPage';

const cleanMarkdown = (text: string | undefined): string => {
    if (!text) return '';
    return text
        .replace(/#+\s?/g, '')
        .replace(/\*\*/g, '')
        .trim();
};

export default function NewsDetailPage({ activeLang }: { activeLang: string }) {
    const { slug } = useParams<{ slug: string }>();
    const [allNews, setAllNews] = useState<NewsItem[]>([]);
    const [item, setItem] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);
    const labels = getUiLabels(activeLang);

    useEffect(() => {
        fetchAllNews().then(data => {
            setAllNews(data);
            const found = data.find(n => {
                const content = getLocalizedContent(n, activeLang);
                // Try matching by localized slug, global slug, id, or slugified title
                const generatedSlug = content.title ? toSlug(content.title) : n.id.toString();
                return (content.slug === slug || n.slug === slug || n.id.toString() === slug || generatedSlug === slug);
            });
            setItem(found || null);
            setLoading(false);
        });
    }, [slug, activeLang]);

    if (loading) return (
        <div className="min-h-screen bg-iaya-bg flex items-center justify-center">
            <div className="animate-pulse text-2xl font-black italic text-white font-outfit">IAya Pulse...</div>
        </div>
    );

    if (!item) return <NotFoundPage activeLang={activeLang} />;

    const content = getLocalizedContent(item, activeLang);
    const currentIndex = allNews.findIndex(n => n.id === item.id);
    const prevItem = currentIndex > 0 ? allNews[currentIndex - 1] : null;
    const nextItem = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null;

    const getSlug = (news: NewsItem) => {
        const c = getLocalizedContent(news, activeLang);
        return c.slug || news.slug || (c.title ? toSlug(c.title) : news.id.toString());
    };

    return (
        <div className="min-h-screen bg-iaya-bg pt-40 pb-24">
            <div className="max-w-7xl mx-auto px-8">
                <Link to="/noticias" className="inline-flex items-center gap-2 text-white/50 hover:text-iaya-orange transition-colors mb-12 font-outfit font-bold uppercase tracking-widest text-xs group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> {labels.newsArchive}
                </Link>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Redesigned Hero Header matching Pulse section */}
                        <div className="relative rounded-[40px] overflow-hidden border border-white/10 bg-white/5 p-8 md:p-16 mb-20 shadow-2xl">
                            <div className="absolute top-8 right-8">
                                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white font-bold uppercase tracking-wider">
                                    {new Date(item.publish_date).toLocaleDateString(activeLang, { day: '2-digit', month: 'long', year: 'numeric' })}
                                </span>
                            </div>

                            <header className="mb-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-iaya-turquoise animate-pulse shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                                    <span className="text-[10px] font-outfit font-bold uppercase tracking-[0.3em] text-iaya-turquoise">
                                        {labels.live}
                                    </span>
                                </div>
                                <h1 className="text-4xl sm:text-7xl font-outfit font-bold text-white tracking-tighter leading-[1.1] max-w-4xl">
                                    {content.title}
                                </h1>
                            </header>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
                                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 bg-black/20 shadow-xl">
                                    {item.image && (
                                        <img
                                            src={getAssetUrl(item.image)}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>

                                <div className="flex flex-col justify-center h-full py-2">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-[1px] w-12 bg-iaya-orange" />
                                        <span className="text-[10px] font-outfit font-bold uppercase tracking-[0.2em] text-iaya-orange">
                                            {labels.nexusLabel}
                                        </span>
                                    </div>
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-white/80 font-inter text-lg leading-relaxed italic">
                                            {cleanMarkdown(content.nexus || content.summary)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

                            {/* Full Content */}
                            <div className="prose prose-invert max-w-none">
                                <div
                                    className="text-white/70 font-inter text-xl leading-relaxed whitespace-pre-line"
                                    dangerouslySetInnerHTML={{ __html: cleanMarkdown(content.full_content || content.content) }}
                                />
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="grid grid-cols-2 gap-6 mt-12">
                            {prevItem ? (
                                <Link
                                    to={`/noticias/${getSlug(prevItem)}`}
                                    className="flex flex-col items-start gap-4 p-8 rounded-[32px] border border-white/10 bg-white/5 hover:bg-white/10 transition-all group backdrop-blur-sm"
                                >
                                    <span className="text-[10px] font-outfit font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-iaya-orange transition-colors flex items-center gap-2">
                                        ← {labels.prevNews}
                                    </span>
                                    <span className="text-white font-outfit font-bold text-lg leading-snug line-clamp-2">
                                        {getLocalizedContent(prevItem, activeLang).title}
                                    </span>
                                </Link>
                            ) : <div />}

                            {nextItem ? (
                                <Link
                                    to={`/noticias/${getSlug(nextItem)}`}
                                    className="flex flex-col items-end text-right gap-4 p-8 rounded-[32px] border border-white/10 bg-white/5 hover:bg-white/10 transition-all group backdrop-blur-sm"
                                >
                                    <span className="text-[10px] font-outfit font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-iaya-turquoise transition-colors flex items-center gap-2">
                                        {labels.nextNews} →
                                    </span>
                                    <span className="text-white font-outfit font-bold text-lg leading-snug line-clamp-2">
                                        {getLocalizedContent(nextItem, activeLang).title}
                                    </span>
                                </Link>
                            ) : <div />}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
