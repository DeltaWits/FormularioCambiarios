/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        "blue-900": "#00185F",
        "green-button": "#9EC72D",
        fondo: "#EBEBEB",
      },
      textColor: {
        "blue-900": "#00185F",
        "blue-button": "#00185F",
      },
    },
  },
  plugins: [],
};
