/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './pages/**/*.{js,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'inter-regular': ['InterRegular', 'sans-serif'],
        'inter-semibold': ['InterSemiBold', 'sans-serif'],
        'inter-bold': ['InterBold', 'sans-serif'],
        'inter-extrabold': ['InterExtraBold', 'sans-serif'],
        'inter-light': ['InterLight', 'sans-serif'],
        'inter-medium': ['InterMedium', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
