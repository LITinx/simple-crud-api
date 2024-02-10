import { IncomingMessage, ServerResponse } from 'http'
import { users } from '../server.js'
import {
	NotFound,
	NotUserFound,
	UUIDIsNotValid,
} from './responseMessages/responseMessages.js'

export const getRequest = (
	req: IncomingMessage,
	res: ServerResponse<IncomingMessage>,
) => {
	const baseUrl = req.url?.substring(0, req.url.lastIndexOf('/') + 1)
	const idFromUrl = req.url?.split('/')[3]
	const uuidRegex = new RegExp(
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
	)
	if (req.url === '/api/users') {
		res.statusCode = 200
		res.setHeader('Content-Type', 'application/json')
		res.write(JSON.stringify(users))
		res.end()
	} else if (idFromUrl && !uuidRegex.test(idFromUrl)) {
		res.writeHead(400, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify(UUIDIsNotValid))
	} else if (
		baseUrl === '/api/users/' &&
		idFromUrl &&
		uuidRegex.test(idFromUrl)
	) {
		const responseUsers = users.filter((user) => {
			return user.id === idFromUrl
		})
		if (responseUsers.length > 0) {
			res.statusCode = 200
			res.setHeader('Content-Type', 'application/json')
			res.write(JSON.stringify(responseUsers))
			res.end()
		}
		res.writeHead(404, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify(NotUserFound(idFromUrl)))
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify(NotFound))
	}
}
