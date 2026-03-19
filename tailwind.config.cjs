/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        industrial: {
          50: '#f7f8fa',
          100: '#eef1f4',
          200: '#d7dee7',
          300: '#b4c0cf',
          400: '#7f90a8',
          500: '#5c6d86',
          600: '#44526a',
          700: '#334055',
          800: '#222d3d',
          900: '#141c28',
        },
      },
      boxShadow: {
        panel: '0 14px 40px rgba(15, 23, 42, 0.12)',
      },
    },
  },
  plugins: [],
};
