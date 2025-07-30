import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#a5b646",
      },
      screens: {
        custom800: "800px",
      },
    }
  },
  plugins: [typography],
};
export default config;
