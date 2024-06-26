/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'base-100': '#f0f0f0', // Define your base-100 color here
      },
    },
  },
   plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.divider': {
          'display': 'flex',
          'align-items': 'center',
        },
        '.divider::before': {
          'content': '""',
          'flex-grow': '0', // Not using flex-grow since width is fixed
          'height': '2px',
          'width': '100px',
          'background-color': '#ffffff', // White color
          'margin-right': '0.5rem',
        },
        '.divider::after': {
          'content': '""',
          'flex-grow': '0', // Not using flex-grow since width is fixed
          'height': '2px',
          'width': '100px',
          'background-color': '#ffffff', // White color
          'margin-left': '0.5rem',
        },
      }, ['before', 'after']);
    }),
  ],
};