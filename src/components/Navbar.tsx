import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/topnav_IAya.png';

const LANGUAGES = [
    { code: 'ES', label: 'ES' },
    { code: 'EN', label: 'EN' },
    { code: 'FR', label: 'FR' },
];

interface NavbarProps {
    activeLang: string;
    setActiveLang: (lang: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeLang, setActiveLang }) => {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const NAV_TEXTS: Record<string, any> = {
        ES: [
            { name: 'Servicios', href: '/servicios' },
            { name: 'Portafolio', href: '/portafolio' },
            { name: 'Noticias', href: '/noticias' },
            { name: 'Recreo', href: '/recreo' },
            { name: 'Origen', href: '/origen' },
            { name: 'Contacto', href: '/#nexo' },
        ],
        EN: [
            { name: 'Services', href: '/servicios' },
            { name: 'Portfolio', href: '/portafolio' },
            { name: 'News', href: '/noticias' },
            { name: 'Recreo', href: '/recreo' },
            { name: 'Origin', href: '/origen' },
            { name: 'Contact', href: '/#nexo' },
        ],
        FR: [
            { name: 'Services', href: '/servicios' },
            { name: 'Portfolio', href: '/portafolio' },
            { name: 'Actualités', href: '/noticias' },
            { name: 'Récréation', href: '/recreo' },
            { name: 'Origen', href: '/origen' },
            { name: 'Contact', href: '/#nexo' },
        ]
    };

    const links = NAV_TEXTS[activeLang] || NAV_TEXTS.ES;


    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-7xl">
            <div className="flex items-center justify-between px-8 py-3 bg-iaya-nav backdrop-blur-[12px] border border-white/10 rounded-full shadow-2xl">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0">
                    <img src={logo} alt="IAya Logo" className="h-10 w-auto object-contain cursor-pointer" />
                </Link>

                {/* Navigation Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {links.map((link: any) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            onMouseEnter={() => setHoveredLink(link.name)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className="relative text-[14px] font-outfit font-medium uppercase tracking-[0.05em] transition-colors duration-300"
                            style={{
                                color: hoveredLink === link.name ? 'oklch(0.65 0.18 45)' : 'white'
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Language Selector Pill */}
                <div className="relative flex items-center bg-white/5 rounded-[50px] p-1 border border-white/5">
                    {/* Sliding Bubble */}
                    <motion.div
                        className="absolute bg-white rounded-full shadow-lg"
                        initial={false}
                        animate={{
                            x: LANGUAGES.findIndex(l => l.code === activeLang) * 44,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        style={{ width: '40px', height: '28px' }}
                    />

                    <div className="relative flex">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => setActiveLang(lang.code)}
                                className={`w-11 h-7 flex items-center justify-center text-[11px] font-outfit font-bold z-10 transition-colors duration-300 ${activeLang === lang.code ? 'text-black' : 'text-white/60 hover:text-white'
                                    }`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
