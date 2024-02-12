import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{js, jsx, ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-roboto-mono)"],
      },
      maxHeight: {
        "screen-minus-navbar": "calc(100vh - 250px)", // Replace 60px with your navbar's height
      },
      minHeight: {
        "screen-minus-navbar": "calc(100vh - 130px)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
