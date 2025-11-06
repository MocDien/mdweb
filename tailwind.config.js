/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
       'spin-slow': 'spin 3s linear infinite',
       },
       colors: {
        brand: '#f3b23a',
        dark: '#0b0706',
        },
       fontFamily: {
        inter: ['Inter', 'sans-serif'],
		   playfair: ['Playfair Display', 'serif'],
		   authentic: ['Authentic Signature', 'serif'],
		   cave: ['Caveat', 'serif'],
		   brico: ['BricolageGrotesque-VariableFont_opsz,wdth,wght', 'serif'],
       },
      animation: {
       'spin-slow': 'spin 2.5s linear infinite',
       },
    },
  },
  plugins: [],
}
