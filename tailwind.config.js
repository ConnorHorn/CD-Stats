import { join } from 'path'

import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin'
import {skeletonTheme} from "./skeletonTheme.ts";

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {},
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				// preset: [
				// 	{
				// 		name: 'modern',
				// 		enhancements: true,
				// 	},
				// ],
				custom: [
					skeletonTheme
				]
			},
		}),
	],
};
