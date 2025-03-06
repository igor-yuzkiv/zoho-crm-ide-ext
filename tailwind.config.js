import PrimeUI from 'tailwindcss-primeui'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: ['selector', '[class~="dark-mode"]'],
    theme: {
        extend: {
            colors: {},
        },
    },
    variants: {
        extend: {},
    },
    plugins: [PrimeUI],
}
