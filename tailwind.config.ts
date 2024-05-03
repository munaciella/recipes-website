import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/app/**/**/*.{ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Lexend", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        "8xl": "88rem",
      },
      colors: {
        primary: {
          "50": "#e7f7e0",
          "100": "#c3f3b8",
          "200": "#90eb83",
          "300": "#5dcf51",
          "400": "#3ab72e",
          "500": "#2aa51f",
          "600": "#1d8b14",
          "700": "#15700f",
          "800": "#11570c",
          "900": "#0e450a",
          "950": "#072803",
        },
        secondary: {
          "50": "#fcfcf2",
          "100": "#f8f8df",
          "200": "#f0efab",
          "300": "#e3e06f",
          "400": "#d3cf3e",
          "500": "#bcb424",
          "600": "#a69d1e",
          "700": "#8a8719",
          "800": "#6f6f13",
          "900": "#59580f",
          "950": "#343209",
        },        
        success: {
          "50": "#ebffe5",
          "100": "#d2ffc6",
          "200": "#a8ff94",
          "300": "#70ff57",
          "400": "#40f724",
          "500": "#1fe605",
          "600": "#10b100",
          "700": "#0f8605",
          "800": "#116a0a",
          "900": "#11590e",
          "950": "#023201",
        },
        warning: {
          "50": "#fafee8",
          "100": "#f3fdc4",
          "200": "#ecfc8c",
          "300": "#e6f94b",
          "400": "#e6f514",
          "500": "#dfe50d",
          "600": "#c6bc08",
          "700": "#9e890a",
          "800": "#836c10",
          "900": "#6f5714",
          "950": "#413007",
        },
        error: {
          "50": "#fff0f0",
          "100": "#ffdede",
          "200": "#ffc2c2",
          "300": "#ff9898",
          "400": "#ff5c5c",
          "500": "#ff2a2a",
          "600": "#f20707",
          "700": "#d10404",
          "800": "#ac0808",
          "900": "#8e0e0e",
          "950": "#4e0101",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
