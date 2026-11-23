const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  content: [
    "./pr9-10*.html"
  ],
  theme: {
    extend: {
      colors: {
        bubble: {
          blue: '#357ff1',
          'blue-light': '#b6ebff',
          'blue-ice': '#afe9fb',
          pink: '#ff83bd',
          yellow: '#ffe35b',
          dark: '#101a38',
          darker: '#111a34',
          border: '#14203d',
          cream: '#fffaf4',
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        semantic: {
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          info: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [
    plugin(function({ matchUtilities, matchVariant, addUtilities }) {
      matchUtilities(
        {
          '@container': (value) => ({
            'container-type': value,
          }),
        },
        {
          values: {
            DEFAULT: 'inline-size',
            normal: 'normal',
          },
        }
      );

      matchVariant(
        '@',
        (value = '') => `@container (min-width: ${value})`,
        {
          values: {
            xs: '320px',
            sm: '384px',
            md: '448px',
            lg: '512px',
            xl: '576px',
          },
        }
      );

      addUtilities({
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
        },
        '.text-gradient': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        }
      });
    })
  ],
};
