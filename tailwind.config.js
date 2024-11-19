/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Include all Angular component files
    "./src/**/*.css", // Include any custom CSS files in Angular project
  ],
  theme: {
    extend: {
      animation: {
        backgroundFlow: "backgroundFlow 5s linear infinite",
      },
      keyframes: {
        backgroundFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      colors: {
        saffron: "#e19a2b",
        saffronDark: "#d4881e",
      },
    },
  },
  plugins: [],
};
