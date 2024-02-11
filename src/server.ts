import dotenv from 'dotenv'
import { createServer } from 'http'
import { createRequire } from 'module'
import { deleteRequest } from './methods/deleteRequest.js'
import { getRequest } from './methods/getRequest.js'
import { postRequest } from './methods/postRequest.js'
import { putRequest } from './methods/putRequest.js'
import { IRequest, IUsers } from './types/types.js'

const require = createRequire(import.meta.url)
export const uuidRegex = new RegExp(
	/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
)
export const users: Array<IUsers> = await require('../data/users.json')

dotenv.config()

const PORT = process.env.PORT || 5001

const server = createServer((req, res) => {
	switch (req.method) {
		case 'GET':
			getRequest(req, res)
			break
		case 'POST':
			postRequest(req as IRequest, res)
			break
		case 'PUT':
			putRequest(req as IRequest, res)
			break
		case 'DELETE':
			deleteRequest(req, res)
			break
		default:
			break
	}
})

server.listen(PORT, () => {
	console.log('Server started on port:', PORT)
})
