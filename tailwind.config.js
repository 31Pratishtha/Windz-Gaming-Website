/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },

    extend: {
      colors: {
        myblack: "#161617",
        lightBlue: "#dff5ff",
        lightText: "rgb(241 245 249)",
        hoverText: "#00d1f7",
        activeText: "#0d4084",
        mywhite: "#f5f5f7",
        blueText: "#0d4084"
      },

      boxShadow: {
        '3xl': "10px 10px 10px 0px rgba(0, 0, 0, 0.3)",
      },

      backdropBlur: {
        xs: '2px',
      }
    },
    plugins: [],
  },
};
