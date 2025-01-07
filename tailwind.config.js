/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        deracula:{
          BACKGROUND:"#282a36",
          CURRENTLINE : "#44475a",
          FOREGROUND : "#f8f8f2",
          COMMENT : "#6272a4",
          CYAN : "#8be9fd",
          GREEN : "#50fa7b",
          ORANGE : "#ffb86c",
          PINK : "#ff79c6",
          PURPLE : "#bd93f9",
          RED : "#ff5555",
          YELLOW : "#f1fa8c"
        }
      }
    },
  },
  plugins: [],
}

