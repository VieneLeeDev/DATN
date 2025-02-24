import type { Config } from "tailwindcss"

const config = {
	darkMode: ["class"],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontFamily: {
				'cormorant': ['"Cormorant Garamond"', 'serif'],
			},
			colors: {
				hoverbtn: "#AA998A",
				main_bg: "#1C2C34"
			},
			boxShadow: {
				'default': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config