import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram, Mail, MessageCircle } from 'lucide-react';
import logo from '../assets/topnav_IAya.png';

interface FooterProps {
    activeLang: string;
}

const Footer: React.FC<FooterProps> = ({ activeLang }) => {
    const socialLinks = [
        {
            icon: <MessageCircle size={20} />,
            label: 'WhatsApp',
            href: 'https://wa.me/593991455770',
            color: 'hover:text-[#25D366]'
        },
        {
            icon: <Mail size={20} />,
            label: 'Email',
            href: 'mailto:joel@iaya.cloud',
            color: 'hover:text-iaya-turquoise'
        },
        {
            icon: <Youtube size={20} />,
            label: 'YouTube',
            href: 'https://www.youtube.com/@IAyaCloud',
            color: 'hover:text-[#FF0000]'
        },
        {
            icon: <Instagram size={20} />,
            label: 'Instagram',
            href: 'https://instagram.com/iaya.cuenca',
            color: 'hover:text-[#E1306C]'
        }
    ];

    const signature = {
        ES: "Hecho con amor y cariño por",
        EN: "Made with love and care by",
        FR: "Fait avec amour et passion par"
    }[activeLang as 'ES' | 'EN' | 'FR'] || "Hecho con amor y cariño por";

    return (
        <footer className="py-20 bg-iaya-bg border-t border-white/5 relative overflow-hidden">
            {/* Subtle glow background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-iaya-ocre/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-12 relative z-10">

                {/* Social Links Row */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                    {socialLinks.map((link, idx) => (
                        <motion.a
                            key={idx}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex items-center gap-3 text-white/40 transition-all duration-300 ${link.color} group`}
                        >
                            <div className="p-3 rounded-full bg-white/5 border border-white/5 group-hover:border-current group-hover:bg-white/10 transition-all duration-500">
                                {link.icon}
                            </div>
                            <span className="font-outfit font-bold text-xs uppercase tracking-[0.2em]">{link.label}</span>
                        </motion.a>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-24 h-px bg-white/10" />

                {/* Logo & Signature */}
                <div className="flex flex-col items-center gap-6">
                    <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] font-medium">
                        {signature}
                    </p>
                    <motion.a
                        href="https://iaya.cloud"
                        className="group"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            src={logo}
                            alt="IAya Agency"
                            className="h-8 w-auto grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        />
                    </motion.a>
                </div>

                <p className="text-white/10 text-[9px] font-inter uppercase tracking-widest mt-4">
                    © {new Date().getFullYear()} IAya Agency. All rights reserved.
                </p>
            </div>

            {/* Cinematic background blobs */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-iaya-ocre/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-iaya-turquoise/5 blur-[100px] rounded-full pointer-events-none" />
        </footer>
    );
};

export default Footer;
