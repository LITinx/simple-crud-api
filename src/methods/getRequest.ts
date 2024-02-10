import { IncomingMessage, ServerResponse } from 'http'
import { users } from '../server.js'

export const getRequest = (
	req: IncomingMessage,
	res: ServerResponse<IncomingMessage>,
) => {
	if (req.url === '/api/users') {
		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.write(JSON.stringify(users))
		res.end()
	}
}
