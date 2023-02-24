/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					primary: '#f8262c',
					secondary: '#D926AA',
					accent: '#c39777',
					neutral: '#5c5e61',
					'base-100': '#f3f4f6',
					'base-200': '#C0C1C2',
					'base-300': '#747575',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272',
				},
			},
			{
				dark: {
					primary: '#f8262c',
					secondary: '#D926AA',
					accent: '#c39777',
					neutral: '#e7e5e4',
					'base-100': '#384241',
					'base-200': '#303834',
					'base-300': '#272B2B',
					info: '#3ABFF8',
					success: '#36D399',
					warning: '#FBBD23',
					error: '#F87272',
				},
			},
		],
	},
};
