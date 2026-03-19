/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D93F2',
        secondary: '#fff',
        twitterGray: '#62748E',
        bgTwitterWhite: '#FAFAFA',
        bgTwitterDark: '#0F172B'
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}

