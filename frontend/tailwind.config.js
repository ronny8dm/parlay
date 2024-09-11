/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Commons', ...defaultTheme.fontFamily.sans],
        common: ['Commons']
      },
      colors: {
        primary: {
          500: '#503BFF',
          textGrey: '#7a7983',
          hover: '#5542ff'
        },
        background: '#050614',
        secondary: {
          200: '#2a283c',
          100: '#121320',
          hover: '#080a85',
          hborder: '#5542ff'
        },
      },
      screens: {
        xs: "540px",
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        lg_992: '992px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '12px',
          sm: '1rem',
          lg: '45px',
          xl: '5rem',
          '2xl': '13rem'
        }
      },
      boxShadow: {
        sm: '0 2px 4px 0 rgb(60 72 88 / 0.15)',
        DEFAULT: '0 0 3px rgb(60 72 88 / 0.15)',
        md: '0 5px 13px rgb(60 72 88 / 0.20)',
        lg: '0 10px 25px -3px rgb(60 72 88 / 0.15)',
        xl: '0 20px 25px -5px rgb(60 72 88 / 0.1), 0 8px 10px -6px rgb(60 72 88 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(60 72 88 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(60 72 88 / 0.05)',
        testi: '2px 2px 2px -1px rgb(60 72 88 / 0.15)',
    },
    }
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],

}
