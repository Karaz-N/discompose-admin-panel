/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "red-dis" : "#810614",
        "white-dis" : "#ffffff",
        "bg-admin" : "#F2F2F2",
        "primary-admin" : "#A92820",
        "menu-admin" : "#FCFCFC",
        "item-admin" : "#313131",

      }
    },
  },
  plugins: [],
}
