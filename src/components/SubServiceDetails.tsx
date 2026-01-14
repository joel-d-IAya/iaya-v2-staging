import React from 'react';
import { Sparkle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SubServiceDetailsProps {
    translationData: {
        title?: string;
        summary?: string;
        full_content?: string;
        examples?: string[];
    };
    accentColor: string;
}

const SubServiceDetails: React.FC<SubServiceDetailsProps> = ({ translationData, accentColor }) => {
    const { summary, full_content, examples } = translationData;

    return (
        <div className="flex flex-col gap-8">
            {/* 1. L'accroche SEO / Summary (La Promesse) */}
            {summary && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg leading-relaxed text-white/70 font-medium"
                >
                    {summary}
                </motion.p>
            )}

            {/* 2. Le contenu riche (Le Corps) */}
            {full_content && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-invert prose-lg max-w-none font-inter text-white/80 leading-relaxed
                               [&_strong]:font-bold"
                    style={{
                        ['--accent-color' as any]: accentColor,
                    }}
                >
                    <div
                        className="[&_strong]:text-[var(--accent-color)]"
                        dangerouslySetInnerHTML={{ __html: full_content }}
                    />
                </motion.div>
            )}

            {/* 3. La liste des exemples (The Proof Layer / Le Muscle) */}
            {examples && examples.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4 pt-8 border-t border-white/10"
                >
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6 font-bold">
                        Cas d'usage concrets
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {examples.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                            >
                                <div className="mt-1 flex-shrink-0">
                                    <Sparkle size={14} style={{ color: accentColor }} className="drop-shadow-[0_0_5px_var(--accent-color)]" />
                                </div>
                                <span className="text-sm text-white/90 leading-relaxed font-medium">{item}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
};

export default SubServiceDetails;
