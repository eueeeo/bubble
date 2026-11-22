import plugin from 'tailwindcss/plugin';

export default {
  darkMode: 'class',
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
    "./resources/**/*.css",
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
          border: 'rgba(16, 26, 56, 0.15)',
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
        },
      },
      borderColor: {
        'bubble-dark': 'rgba(16, 26, 56, 0.25)',
        'bubble-border': 'rgba(16, 26, 56, 0.15)',
      },
      boxShadow: {
        'brutal-sm': '0 2px 0 rgba(16, 26, 56, 0.16)',
        'brutal': '0 3px 0 rgba(16, 26, 56, 0.16)',
        'brutal-btn': '0 3px 0 rgba(16, 26, 56, 0.22)',
        'brutal-btn-hover': '0 4px 0 rgba(16, 26, 56, 0.28)',
        'brutal-lg': '0 4px 0 rgba(16, 26, 56, 0.16)',
      },
      fontFamily: {
        sans: ['Karusel', 'Arial', 'Helvetica', 'sans-serif'],
        karusel: ['Karusel', 'sans-serif'],
      },
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
}
