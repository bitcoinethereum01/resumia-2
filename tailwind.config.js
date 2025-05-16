/** @type {import('tailwindcss').Config} */
export default {
  content: [
"./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        andika: ['Andika', 'serif']
      },
      colors: {
        myblack: {
          300: "#262A2C",
          400: "#212529",
          500: "#454a4d",
          600: "#1C1F21",
          700: "#131516"
        },
        border: "rgba(70, 80, 83, 0.5)"
      },
      screens: {
        sml: "500px",
        '2xlm': "1537px"
      }
    },
  },
  plugins: [],
}

