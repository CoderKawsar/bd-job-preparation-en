/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      
      
      colors:{
        'bluePrimary':"#525FE1",
        'cyanPrimary':"#231F40",
        'yellowPrimary':"#F86F03",
        'graySecondary':"#A4A2AF"
        
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    // themes: ["light","dark"],
  },
}
