/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function({addComponents}) {
      addComponents({
        '.btn': {
          padding: '0.5rem',
          margin: '0.5rem',
          borderRadius: '0.5rem',
          backgroundColor: '#0284c7',
          color: '#fff',
          '&:hover':{
            backgroundColor: '#0ea5e9',
          } 
        }
      })
    })
  ],
  
}
