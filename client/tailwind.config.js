/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14151A",
        secondary: "F472B6",
        accent: "#2ECC71",
        background: "#F5F5F5",
        text: "#333333",
      },
    },
  },
  plugins: [daisyui],
};
