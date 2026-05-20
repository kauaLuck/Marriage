import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: '#EDE0D4',
        almond: '#D6CCC2',
        mocha: '#7F5539',
        caramel: '#B08968',
        olive: '#6B705C',
        sage: '#A5A58D',
        foreground: '#2B211B',
        background: '#FCFAF7',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 50px rgba(127, 85, 57, 0.10)',
        float: '0 20px 80px rgba(17, 12, 8, 0.12)',
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(237,224,212,0.9), rgba(252,250,247,0.4) 40%, transparent 70%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
