import { motion } from 'framer-motion';

export default function RecreoPage({ activeLang }: { activeLang: string }) {
    const titles: Record<string, string> = {
        ES: 'Espacio Recreo',
        EN: 'Recreo Space',
        FR: 'Espace Récréation'
    };

    return (
        <div className="min-h-screen bg-iaya-bg pt-40 pb-24 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto px-8 text-center"
            >
                <h1 className="text-5xl sm:text-7xl font-outfit font-bold text-white tracking-tighter mb-8">
                    {titles[activeLang] || titles.ES}
                </h1>
                <p className="text-white/40 font-inter text-lg max-w-2xl mx-auto leading-relaxed">
                    {activeLang === 'ES' && "Próximamente compartiremos anécdotas y experiencias sobre el mundo de la Inteligencia Artificial."}
                    {activeLang === 'EN' && "Soon we will share anecdotes and experiences about the world of Artificial Intelligence."}
                    {activeLang === 'FR' && "Bientôt, nous partagerons des anecdotes et des expériences sur le monde de l'Intelligence Artificielle."}
                </p>

                <div className="mt-20 flex justify-center">
                    <div className="w-px h-32 bg-gradient-to-b from-iaya-turquoise/30 via-iaya-turquoise/5 to-transparent" />
                </div>
            </motion.div>
        </div>
    );
}
