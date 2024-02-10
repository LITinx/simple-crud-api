import { writeFile } from 'fs/promises'
import path from 'path'
import { users } from '../server.js'
import { getFilePath } from './getFilePath.js'
import { IUsers } from '../types/types.js'

export const writeToFile = async (data: Array<IUsers>) => {
	try {
		const __dirname = getFilePath(import.meta.url)
		const fileToWritePath = path.join(
			__dirname,
			'..',
			'..',
			'data',
			'users.json',
		)
		await writeFile(fileToWritePath, JSON.stringify(data), 'utf-8')
	} catch (err) {
		console.log(err)
	}
}
