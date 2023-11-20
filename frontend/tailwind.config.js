/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kanban_bg: {
          DEFAULT: "#8F3F65",
          plan: "#101204",
          card: "#22272B",
          add_plan: "#AA6D8A",
          add_plan_hover: "#93557A",
          scroll: "#AF8699",
          tooltip: "#9FADBC"
        },
        kanban_txt: {
          DEFAULT: "#B6C2CF"
        }
      }
    },
  },
  plugins: [],
}
