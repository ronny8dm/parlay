/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Commons', ...defaultTheme.fontFamily.sans],
        common: ['Commons']
      },
    },
    colors:{
      primary:{
        500: '#503BFF',
        hover: '#5542ff'
      },
      background: '#050614',

      secondary:{
        200: '#2a283c'
      },
      
    }
  },
  plugins: [],
}

