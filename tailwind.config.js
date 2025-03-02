/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4255FF",
                secondary: "#FF6B00",
                dark: "#1D2026",
                light: "#F5F7FA",
                "gray-light": "#F0F2F5",
                "gray-medium": "#6B7385",
                "gray-dark": "#4A5568",
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
}