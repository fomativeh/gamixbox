import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      dark_blue_1: "#00001F",
      dark_blue_2:"#000029",
      light_blue_1:"#7070FF"
    }
  },
  plugins: [],
};
export default config;
