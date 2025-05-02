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
        primary: "#e53935",
        secondary: "#fff7f7",
        accent: "#1976d2",
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
          accent: "#1976d2",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
        },
        dark: {
          primary: "#ef5350",
          secondary: "#2b1b1b",
          accent: "#90caf9",
          neutral: "#cfd8dc",
          "base-100": "#121212",
        },
      },
    ],
  },
};
