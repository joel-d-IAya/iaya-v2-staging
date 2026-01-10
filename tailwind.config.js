/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
            },
            colors: {
                'iaya-bg': 'oklch(0.15 0.01 240)',
                'iaya-nav': 'oklch(0.18 0.01 240)',
                'iaya-ocre': 'oklch(0.65 0.18 45)',
                'iaya-emerald': 'oklch(0.70 0.15 160)',
                'iaya-orange': 'oklch(65% 0.20 45)', // Keeping for compatibility if used elsewhere
                'iaya-turquoise': 'oklch(70% 0.15 190)', // Keeping for compatibility
            },
        },
    },
    plugins: [],
}
