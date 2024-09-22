/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "cinzel-c": '"Cinzel", serif'
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')],
}

