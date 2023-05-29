const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		// fontFamily: {
		// 	sans: ['Quicksand', ...defaultTheme.fontFamily.sans]
		// },
		extend: {},
	},
	plugins: [],
}