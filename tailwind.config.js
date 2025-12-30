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
                'iaya-bg': 'oklch(15% 0.02 260)',
                'iaya-nav': '#141B2D',
                'iaya-orange': 'oklch(65% 0.20 45)',
                'iaya-turquoise': 'oklch(70% 0.15 190)',
            },
        },
    },
    plugins: [],
}
