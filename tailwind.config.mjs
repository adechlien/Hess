/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		colors: {
		  "bou-1": "#C7DCFF",
		  "bou-2": "#B4D0FF",
		  "bou-3": "#A1C4FF",
		  "bou-4": "#8FB1F0",

			"ven-1": "#C7AFD7",
			"ven-2": "#DBCCE8",
			"ven-3": "#F6F8FE",
			"ven-4": "#D9EEDB",
			"ven-5": "#B0D8BE",

			"swamp-1": "#091A2B",
			"swamp-3": "#1E2646",

			"pat-1": "#D19090",
		}
	},
	plugins: [],
}
