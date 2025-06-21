/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0f172a',
        'medium-blue': '#1e293b',
        'light-blue': '#60a5fa',
        'border-blue': '#334155',
        'text-light': '#e2e8f0',
        'text-muted': '#94a3b8',
      },
    },
  },
  plugins: [],
} 