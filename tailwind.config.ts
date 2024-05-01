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
          "50": "#fef9ec",
          "100": "#fbefca",
          "200": "#f7dd90",
          "300": "#f2c757",
          "400": "#efb130",
          "500": "#e99520",
          "600": "#cd6d12",
          "700": "#ab4d12",
          "800": "#8b3d15",
          "900": "#723315",
          "950": "#411807",
        },
        secondary: {
          "50": "#f4f7f9",
          "100": "#ecf0f3",
          "200": "#dce3e9",
          "300": "#c6d1db",
          "400": "#aebccb",
          "500": "#8d9cb4",
          "600": "#828ea9",
          "700": "#6f7993",
          "800": "#5b6478",
          "900": "#4d5462",
          "950": "#2d3039",
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
