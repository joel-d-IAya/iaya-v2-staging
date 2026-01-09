import { motion } from 'framer-motion';

export default function ContactoPage({ activeLang }: { activeLang: string }) {
    const titles: Record<string, string> = {
        ES: 'Contacto',
        EN: 'Contact',
        FR: 'Contact'
    };

    return (
        <div className="min-h-screen bg-iaya-bg pt-40 pb-24 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-7xl mx-auto px-8 text-center"
            >
                <h1 className="text-5xl sm:text-7xl font-outfit font-bold text-white tracking-tighter mb-8 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent">
                    {titles[activeLang] || titles.ES}
                </h1>
                <p className="text-white/40 font-inter text-lg max-w-2xl mx-auto leading-relaxed">
                    {activeLang === 'ES' && "¿Quieres conocer mejor nuestro ecosistema? Agendemos una sesión de descubrimiento hoy."}
                    {activeLang === 'EN' && "Want to know our ecosystem better? Let's schedule a discovery session today."}
                    {activeLang === 'FR' && "Vous souhaitez mieux connaître notre écosystème ? Planifions une séance de découverte dès aujourd'hui."}
                </p>

                <div className="mt-20 p-12 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl max-w-xl mx-auto">
                    <p className="text-iaya-orange font-outfit font-bold uppercase tracking-widest text-xs mb-4">Under Construction</p>
                    <p className="text-white/80">hola@iaya.cloud</p>
                </div>

                <div className="mt-20 flex justify-center">
                    <div className="w-px h-32 bg-gradient-to-b from-iaya-orange/30 via-iaya-orange/5 to-transparent" />
                </div>
            </motion.div>
        </div>
    );
}
