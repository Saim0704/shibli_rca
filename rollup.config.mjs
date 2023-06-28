import run from '@rollup/plugin-run'
import terser from '@rollup/plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import includePaths from 'rollup-plugin-includepaths'

const dev = process.env.ROLLUP_WATCH === 'true'
const config = {
	input: 'index.ts',
	output: {
		file: 'dist/index.js'
	},
	plugins: [
		includePaths({
			include: {},
			paths: ['.'],
			external: [],
			extensions: ['.js', '.ts', '.d.ts', '.cjs'],
			exclude: ['client']
		}),
		commonjs({ extensions: ['.js', '.ts', '.cjs'] }),
		typescript(),
		dev && run(),
		!dev && terser()
	],
	external: ['cors', 'http', 'helmet', 'express', 'mongoose', 'dotenv/config', 'jsonwebtoken', 'bcrypt', 'nodemailer', 'multer', 'multer-storage-cloudinary', 'ejs', 'cloudinary']
}

export default config
