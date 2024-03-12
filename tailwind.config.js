/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';

const tailwindConfig = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
    fontFamily: {
      'cairo': ['Cairo', 'sans-serif']
    }
  },
  darkMode: "class",
  plugins: [nextui()]
};

export default tailwindConfig;
