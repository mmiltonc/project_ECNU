import type { Config } from 'tailwindcss'

const config: Config = {
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
      }
    },
    screens: {
      '2sm': '300px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  important: true,
  plugins: [
    require('tailwindcss-bg-patterns'),
  ],
}
export default config
