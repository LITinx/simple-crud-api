import path from 'path'
import { fileURLToPath } from 'url'

export const getFilePath = (metaUrl: string) => {
	console.log(metaUrl)

	const __filename = fileURLToPath(metaUrl)
	const __dirname = path.dirname(__filename)
	return __dirname
}
