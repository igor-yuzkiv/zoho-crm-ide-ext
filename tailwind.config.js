import primeui from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                haze: {
                    50: '#f6f8fa',
                    100: '#ebeff3',
                    200: '#d2dde5',
                    300: '#aabfcf',
                    400: '#7d9eb3',
                    500: '#5c819b',
                    600: '#486781',
                    700: '#3b5469',
                    800: '#344758',
                    900: '#2f3e4b',
                    950: '#1f2832',
                },
            },
        },
    },
    plugins: [primeui],
}
