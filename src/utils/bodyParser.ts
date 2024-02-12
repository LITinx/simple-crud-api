import { IRequest, IUsers } from '../types/types.js'

export const bodyParser = (request: IRequest): Promise<IUsers> => {
	return new Promise((resolve, reject) => {
		try {
			let body = ''
			request.on('data', (chunk) => {
				body += chunk
			})
			request.on('end', () => {
				resolve(JSON.parse(body))
			})
		} catch (err) {
			console.error(err)
			reject(err)
		}
	})
}
