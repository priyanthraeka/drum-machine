/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        russoOne: "Russo One",
      },
      boxShadow: {
        custom: "black 3px 3px 5px",
      },
    },
  },
  plugins: [],
};
