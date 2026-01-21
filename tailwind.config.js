/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './index.html'
    ],
    theme: {
        fontFamily:{
            'sans': ['Poppins', 'sans-serif']
        },
        extend: {
            backgroundImage: {
                "home": "url('../assets/bg.png')"
            }
        },
    },
    plugins: [],
}