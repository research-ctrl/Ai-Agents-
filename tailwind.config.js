/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        panel: '#0f172a',
        accent: '#38bdf8',
        steel: '#94a3b8',
        dock: '#0b1120',
      },
      boxShadow: {
        panel: '0 20px 50px -20px rgba(15, 23, 42, 0.45)',
      },
    },
  },
  plugins: [],
};
