import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        custom800: "800px", // your custom breakpoint
      },
    },
  },
  plugins: [typography],
};
export default config;
