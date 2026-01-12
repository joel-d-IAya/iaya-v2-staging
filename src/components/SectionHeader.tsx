import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
    intro: string;
    title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ intro, title }) => {
    return (
        <header className="mb-16">
            <div className="flex items-center gap-4 mb-4">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 40 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="h-px bg-iaya-orange"
                />
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-iaya-orange font-outfit uppercase tracking-[0.3em] text-sm font-bold"
                >
                    {intro}
                </motion.span>
            </div>
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-outfit font-bold text-white tracking-tighter leading-none"
            >
                {title}
            </motion.h2>
        </header>
    );
};

export default SectionHeader;
