/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,css,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2ec4b6",
        primaryl: "#cbf3f0",
        white: "#ffffff",
        secondaryl: "#ffbf69",
        secondary: "#ff9f1c",
      },
    },
    plugins: [require("daisyui")],
  },
};
