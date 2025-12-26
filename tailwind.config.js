/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'ia-bg': 'oklch(15% 0.02 260)',
                'ia-orange': 'oklch(65% 0.20 45)',
                'ia-turquoise': 'oklch(70% 0.15 190)',
            },
        },
    },
    plugins: [],
}
