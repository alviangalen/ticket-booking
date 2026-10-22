/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#760009",
        "primary-container": "#991b1b",
        "on-primary": "#ffffff",
        "on-primary-container": "#ffaaa1",
        secondary: "#006781",
        "secondary-teal": "#0e7490",
        "secondary-container": "#8fdfff",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#00647d",
        tertiary: "#5a2b00",
        "tertiary-container": "#7c3d00",
        amber: {
          500: "#e67e22",
          600: "#d97706",
        },
        background: "#fdf9f3",
        surface: "#fdf9f3",
        "surface-container": "#f1ede7",
        "surface-container-low": "#f7f3ed",
        "surface-container-high": "#ebe8e2",
        "surface-container-highest": "#e6e2dc",
        "surface-variant": "#e6e2dc",
        "on-surface": "#1c1c18",
        "on-surface-variant": "#59413e",
        outline: "#8d706d",
        "outline-variant": "#e1bfbb",
        error: "#ba1a1a",
      },
      fontFamily: {
        headline: ["'Bricolage Grotesque'", "sans-serif"],
        body: ["'Space Grotesk'", "'Plus Jakarta Sans'", "sans-serif"],
        display: ["'Bricolage Grotesque'", "sans-serif"],
      },
      boxShadow: {
        hard: "4px 4px 0px #1c1c18",
        "hard-sm": "2px 2px 0px #1c1c18",
        "hard-lg": "6px 6px 0px #1c1c18",
        "hard-red": "4px 4px 0px #760009",
      },
    },
  },
  plugins: [],
}
