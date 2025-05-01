/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e53935", // Primary Red
        secondary: "#fff7f7", // Secondary Light
        accent: "#1976d2", // Accent Blue (or change to #00b894)
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#e53935",
          secondary: "#fff7f7",
          accent: "#1976d2", // Change to #00b894 if preferred
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
        },
      },
    ],
    dark: false, // disables dark theme switching
  },
};
