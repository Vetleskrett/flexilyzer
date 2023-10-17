import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        oswald: ["var(--font-oswald)"],
        cabin: ["var(--font-cabin)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
