import dotenv from 'dotenv'
import { createServer } from 'http'
import { createRequire } from 'module'
import { getRequest } from './methods/getRequest.js'

const require = createRequire(import.meta.url)
interface IUsers {
	id: string
	username: string
	age: string
	hobbies: Array<string>
}
export const users: Array<IUsers> = await require('../data/users.json')
dotenv.config()

const PORT = process.env.PORT || 5001

const server = createServer((req, res) => {
	switch (req.method) {
		case 'GET':
			getRequest(req, res)
			break
		case 'POST':
			break
		case 'PUT':
			break
		case 'DELETE':
			break
		default:
			break
	}
})

server.listen(PORT, () => {
	console.log('Server started on port:', PORT)
})
