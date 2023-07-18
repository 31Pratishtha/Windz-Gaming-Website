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

    extend: {
      colors: {
        myblack: "#161617",
        lightBlue: "#dff5ff",
        lightText: "rgb(241 245 249)",
        hoverText: "#00d1f7",
        activeText: "#0d4084",
        mywhite: "#f5f5f7",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
    plugins: [],
  },
};
