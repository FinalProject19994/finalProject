/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary_yellow: "#fff48d",
        primary_lightyellow: "#FFF9C2",
        primary_blue: "#c3ebfa",
        primary_lightblue: "#ECF9FD",
        primary_orange: "#FFC78E",
      },
      fontFamily: {
        oswald: ["var(--font-oswald)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
