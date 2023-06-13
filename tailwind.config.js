/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main':'var(--main)',
        'secondary':'var(--secondary)',
        'text-main':'var(--text-main)',
        'text-secondary':'var(--text-secondary)',
      }

    },
  },
  plugins: [],
}
