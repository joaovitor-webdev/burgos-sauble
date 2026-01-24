/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './index.html'
    ],
    theme: {
        fontFamily: {
            'sans': ['Poppins', 'sans-serif']
        },
        extend: {
            backgroundImage: {
                "home": "url('../assets/bg.png')",
                "fundo": "url('https://img.freepik.com/fotos-gratis/fundo-de-piso-de-madeira-marrom-com-textura_53876-129599.jpg')"
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'floating': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}