/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth:{
        leftmenu: '23px',
      },
      maxWidth:{
        leftmenu: '288px',
      }
    },
  },
  plugins: [],
}

