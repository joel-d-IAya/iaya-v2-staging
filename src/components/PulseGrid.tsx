import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchNews, getAssetUrl, getUiLabels, getLocalizedContent, type NewsItem, toSlug } from '../services/api';
import SectionHeader from './SectionHeader';

const TEXTS: Record<string, { title: string, subtitle: string, intro: string }> = {
    ES: { title: 'PULSE / NEWS', subtitle: 'Las últimas noticias de IA', intro: 'ÚLTIMAS NOTICIAS DE LA IA' },
    EN: { title: 'PULSE / NEWS', subtitle: 'Latest AI News', intro: 'LATEST AI NEWS' },
    FR: { title: 'PULSE / NEWS', subtitle: 'Dernières nouvelles de l\'IA', intro: 'DERNIÈRES NOUVELLES DE L\'IA' }
};

const PulseIndicator = ({ label }: { label: string }) => (
    <div className="flex items-center gap-2 mb-4">
        <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-iaya-turquoise opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-iaya-turquoise"></span>
        </div>
        <span className="text-iaya-turquoise font-outfit font-bold text-xs tracking-[0.2em]">{label}</span>
    </div>
);

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
    // Remove ### (headings) and ** (bold) markers correctly
    return text
        .replace(/#+\s?/g, '') // Remove all level of heading markers (#, ##, ###, etc.)
        .replace(/\*\*/g, '')   // Remove bold markers
        .trim();
};

export default function PulseGrid({ locale }: { locale: string }) {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const labels = getUiLabels(locale);

    useEffect(() => {
        fetchNews().then(data => {
            setNews(data);
            setLoading(false);
        });
    }, []);

    const t = TEXTS[locale] || TEXTS.ES;

    if (loading) return (
        <section className="py-24 bg-iaya-bg">
            <div className="max-w-7xl mx-auto px-8">
                <div className="h-10 w-48 bg-white/5 rounded-lg mb-12 animate-pulse" />
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-12 aspect-video bg-white/5 rounded-3xl animate-pulse" />
                    {[1, 2, 3].map(i => (
                        <div key={i} className="col-span-12 md:col-span-4 aspect-square bg-white/5 rounded-3xl animate-pulse" />
                    ))}
                </div>
            </div>
        </section>
    );

    const heroNews = news[0];
    const historyFeed = news.slice(1, 4);

    return (
        <section id="noticias" className="py-32 bg-iaya-bg relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-8">
                <SectionHeader
                    intro={t.intro}
                    title={t.title}
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    {/* Hero News: Redesigned Layout */}
                    {heroNews && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="col-span-1 md:col-span-12 group"
                        >
                            <div className="relative rounded-[32px] overflow-hidden border border-white/10 bg-white/5 p-8 md:p-12">
                                <div className="absolute top-8 right-8 z-20">
                                    <TimePill date={heroNews.publish_date} locale={locale} />
                                </div>

                                {/* 1. Title at the top */}
                                <PulseIndicator label={labels.live} />
                                <h3
                                    className="text-3xl sm:text-5xl font-outfit font-bold text-white mb-10 tracking-tight leading-tight cursor-pointer hover:text-iaya-orange transition-colors"
                                    onClick={() => {
                                        const content = getLocalizedContent(heroNews, locale);
                                        const slug = content.slug || heroNews.slug || (content.title ? toSlug(content.title) : heroNews.id);
                                        window.location.href = `/noticias/${slug}`;
                                    }}
                                >
                                    {getLocalizedContent(heroNews, locale).title || "Untitled News"}
                                </h3>

                                {/* 2. Row: Image (16:9) and Summary (Nexus) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 items-start">
                                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-black/20">
                                        {(heroNews.image) && (
                                            <img
                                                src={getAssetUrl(heroNews.image)}
                                                alt=""
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                    </div>

                                    <div className="flex flex-col justify-center h-full">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="h-[1px] w-8 bg-iaya-orange" />
                                            <span className="text-[9px] font-outfit font-bold uppercase tracking-[0.2em] text-iaya-orange">{labels.nexusLabel}</span>
                                        </div>
                                        <p className="text-white/80 font-inter text-base leading-relaxed italic">
                                            {cleanMarkdown(getLocalizedContent(heroNews, locale).nexus || getLocalizedContent(heroNews, locale).summary)}
                                        </p>
                                    </div>
                                </div>

                                {/* 3. Full Content below */}
                                <div className="prose prose-invert max-w-none">
                                    <div
                                        className="text-white/60 font-inter text-base leading-relaxed whitespace-pre-line"
                                        dangerouslySetInnerHTML={{ __html: cleanMarkdown(getLocalizedContent(heroNews, locale).content) }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* History Feed: 3 Columns */}
                    {historyFeed.map((item, idx) => {
                        const content = getLocalizedContent(item, locale);
                        const title = content.title || "Untitled News";
                        const fullContentSource = content.full_content || content.content || "";
                        // Clean first, then Extract exactly first 150 chars as requested
                        const summary = cleanMarkdown(fullContentSource).substring(0, 150) + '...';
                        const slug = content.slug || item.slug || (content.title ? toSlug(content.title) : item.id);

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                                viewport={{ once: true }}
                                className="col-span-1 md:col-span-4 group cursor-pointer"
                                onClick={() => window.location.href = `/noticias/${slug}`}
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
                                        <TimePill date={item.publish_date} locale={locale} />
                                    </div>
                                </div>
                                <div className="relative">
                                    <h4 className="text-xl font-outfit font-bold text-white mb-4 line-clamp-2 group-hover:text-iaya-orange transition-colors">
                                        {title}
                                    </h4>
                                    <div className="relative">
                                        <p className="text-white/50 font-inter text-sm leading-relaxed line-clamp-3 mb-6">
                                            {summary}
                                        </p>
                                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-iaya-bg to-transparent pointer-events-none" />
                                    </div>
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

                <div className="mt-20 flex justify-center">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/noticias'}
                        className="px-10 py-5 rounded-full bg-white text-iaya-bg font-outfit font-bold text-lg hover:bg-iaya-orange hover:text-white transition-all duration-300 shadow-xl shadow-iaya-orange/10"
                    >
                        {labels.readAllNews}
                    </motion.button>
                </div>
            </div>
        </section >
    );
}
