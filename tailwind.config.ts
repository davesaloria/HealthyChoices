import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f8f3',
          100: '#e8f0e4',
          200: '#d4e3ce',
          300: '#b8cfb0',
          400: '#99b88d',
          500: '#5F8F4E',
          600: '#4a6e3f',
          700: '#3d5832',
          800: '#2e4425',
          900: '#1f2b17',
        },
        sage: {
          50: '#f9faf7',
          100: '#f0f3eb',
          200: '#dde8d7',
          300: '#c9ddc0',
          400: '#aed1a0',
          500: '#8dc080',
          600: '#6fa866',
          700: '#5a8c54',
          800: '#4a7245',
          900: '#3c5a37',
        },
        cream: {
          50: '#fdfcfa',
          100: '#f7f2e8',
          200: '#f0e8d9',
          300: '#e6dcc8',
          400: '#d9cdb8',
          500: '#cbbfa3',
          600: '#b8a88d',
          700: '#a3926f',
          800: '#8a7857',
          900: '#6f6447',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#808080',
          500: '#2e2e2e',
          600: '#262626',
          700: '#1f1f1f',
          800: '#141414',
          900: '#0a0a0a',
        },
        coral: {
          50: '#fef9f6',
          100: '#feead7',
          200: '#fdd4b0',
          300: '#fbb882',
          400: '#f29d54',
          500: '#f28c5c',
          600: '#e57c4a',
          700: '#d4643a',
          800: '#b8512e',
          900: '#8f3e1f',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Sora', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }],
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
        '3xl': '3rem',
        '4xl': '4rem',
        '5xl': '5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

export default config
