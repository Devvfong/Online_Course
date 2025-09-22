/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3B82F6',
        'secondary': '#1E40AF',
        'accent': '#F59E0B',
        'success': '#10B981',
        'warning': '#F59E0B',
        'danger': '#EF4444'
      }
    },
  },
  plugins: [],
}