/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tahoma: ['Tahoma', 'sans-serif'], // Adding Tahoma to the font family list
        degular: ['degular-display', 'sans-serif'],
      },
      colors: {
        'body-bg': 'var(--background-color)',
        'body-text': '#F5F5F5',
        'yellow-text': 'var(--hover-color)',
        'white': 'var(--text-white)',
        'bg-black': 'var(--background-color)',
        'hover-yellow': 'var(--hover-color)',
        
        
      },
      screens: {
        'xs': '320px',  // Custom for 320px screens
        'sm-xs': '375px',  // Custom for 375px screens
        'sm-md': '425px',  // Custom for 425px screens
        // Default breakpoints remain intact
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '2000px',
      },
    },
  },
  plugins: [],
}

