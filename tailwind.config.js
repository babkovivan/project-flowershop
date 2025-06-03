/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Alumni Sans', 'sans-serif'],
      },
      maxWidth: {
        'section': '1200px',
      },
    },
  },
  plugins: [],
};
