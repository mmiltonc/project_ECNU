

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DE0000',
        secondary: '#F9F9F9',
        base: '#282828',
      },
      keyframes: {
        'fade-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-200px)', // Asegúrate de que el desplazamiento sea hacia la izquierda
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(100%)', // Volver a la posición original
          },
        },
      },
      animation: {
        'fade-in-left': 'fade-in-left 1s ease-out forwards',
      },
    },
    screens: {
      '2sm': '300px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '2000px'
    },
    letterSpacing: {
      widest: '10px'
    }
  },
  important: true,
  plugins: [
    require('tailwindcss-animated'),
    require('tailwindcss-bg-patterns'),
  ],
}