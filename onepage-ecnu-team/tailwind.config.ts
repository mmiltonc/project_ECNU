

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
      backgroundImage: {
        'radial-red-black': 'radial-gradient(closest-side, #ef4444, #171717)',
        'radial-gray-black': 'radial-gradient(closest-side, #5f5f5f, #171717)',
        'radial-blue-yellow': 'linear-gradient(to right, #99df5b, #171717)',
        'radial-black-gray': 'linear-gradient(to right, #171717, #5f5f5f)',
        'radial-red-gray': 'linear-gradient(to right, #fa2525, #171717)',
        'radial-red-white': 'radial-gradient(closest-side, #ef4444, #ffffff)'
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