import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const skeletonTheme: CustomThemeConfig = {
	name: 'skeletonTheme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `system-ui`,
		'--theme-font-family-heading': `system-ui`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #0bbce0
		'--color-primary-50': '218 245 250', // #daf5fa
		'--color-primary-100': '206 242 249', // #cef2f9
		'--color-primary-200': '194 238 247', // #c2eef7
		'--color-primary-300': '157 228 243', // #9de4f3
		'--color-primary-400': '84 208 233', // #54d0e9
		'--color-primary-500': '11 188 224', // #0bbce0
		'--color-primary-600': '10 169 202', // #0aa9ca
		'--color-primary-700': '8 141 168', // #088da8
		'--color-primary-800': '7 113 134', // #077186
		'--color-primary-900': '5 92 110', // #055c6e
		// secondary | #382eea
		'--color-secondary-50': '225 224 252', // #e1e0fc
		'--color-secondary-100': '215 213 251', // #d7d5fb
		'--color-secondary-200': '205 203 250', // #cdcbfa
		'--color-secondary-300': '175 171 247', // #afabf7
		'--color-secondary-400': '116 109 240', // #746df0
		'--color-secondary-500': '56 46 234', // #382eea
		'--color-secondary-600': '50 41 211', // #3229d3
		'--color-secondary-700': '42 35 176', // #2a23b0
		'--color-secondary-800': '34 28 140', // #221c8c
		'--color-secondary-900': '27 23 115', // #1b1773
		// tertiary | #62b8f9
		'--color-tertiary-50': '231 244 254', // #e7f4fe
		'--color-tertiary-100': '224 241 254', // #e0f1fe
		'--color-tertiary-200': '216 237 254', // #d8edfe
		'--color-tertiary-300': '192 227 253', // #c0e3fd
		'--color-tertiary-400': '145 205 251', // #91cdfb
		'--color-tertiary-500': '98 184 249', // #62b8f9
		'--color-tertiary-600': '88 166 224', // #58a6e0
		'--color-tertiary-700': '74 138 187', // #4a8abb
		'--color-tertiary-800': '59 110 149', // #3b6e95
		'--color-tertiary-900': '48 90 122', // #305a7a
		// success | #02ed2a
		'--color-success-50': '217 252 223', // #d9fcdf
		'--color-success-100': '204 251 212', // #ccfbd4
		'--color-success-200': '192 251 202', // #c0fbca
		'--color-success-300': '154 248 170', // #9af8aa
		'--color-success-400': '78 242 106', // #4ef26a
		'--color-success-500': '2 237 42', // #02ed2a
		'--color-success-600': '2 213 38', // #02d526
		'--color-success-700': '2 178 32', // #02b220
		'--color-success-800': '1 142 25', // #018e19
		'--color-success-900': '1 116 21', // #017415
		// warning | #EAB308
		'--color-warning-50': '252 244 218', // #fcf4da
		'--color-warning-100': '251 240 206', // #fbf0ce
		'--color-warning-200': '250 236 193', // #faecc1
		'--color-warning-300': '247 225 156', // #f7e19c
		'--color-warning-400': '240 202 82', // #f0ca52
		'--color-warning-500': '234 179 8', // #EAB308
		'--color-warning-600': '211 161 7', // #d3a107
		'--color-warning-700': '176 134 6', // #b08606
		'--color-warning-800': '140 107 5', // #8c6b05
		'--color-warning-900': '115 88 4', // #735804
		// error | #d71414
		'--color-error-50': '249 220 220', // #f9dcdc
		'--color-error-100': '247 208 208', // #f7d0d0
		'--color-error-200': '245 196 196', // #f5c4c4
		'--color-error-300': '239 161 161', // #efa1a1
		'--color-error-400': '227 91 91', // #e35b5b
		'--color-error-500': '215 20 20', // #d71414
		'--color-error-600': '194 18 18', // #c21212
		'--color-error-700': '161 15 15', // #a10f0f
		'--color-error-800': '129 12 12', // #810c0c
		'--color-error-900': '105 10 10', // #690a0a
		// surface | #333333
		'--color-surface-50': '224 224 224', // #e0e0e0
		'--color-surface-100': '214 214 214', // #d6d6d6
		'--color-surface-200': '204 204 204', // #cccccc
		'--color-surface-300': '173 173 173', // #adadad
		'--color-surface-400': '112 112 112', // #707070
		'--color-surface-500': '51 51 51', // #333333
		'--color-surface-600': '46 46 46', // #2e2e2e
		'--color-surface-700': '38 38 38', // #262626
		'--color-surface-800': '31 31 31', // #1f1f1f
		'--color-surface-900': '25 25 25' // #191919
	}
};
