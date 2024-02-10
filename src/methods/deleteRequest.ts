import { IncomingMessage, ServerResponse } from 'http'
import { users } from '../server.js'
import {
	UUIDIsNotValid,
	UserNotFound,
} from './responseMessages/responseMessages.js'
import { writeToFile } from '../utils/writeToFile.js'

export const deleteRequest = (
	req: IncomingMessage,
	res: ServerResponse<IncomingMessage>,
) => {
	const baseUrl = req.url?.substring(0, req.url.lastIndexOf('/') + 1)
	const idFromUrl = req.url?.split('/')[3]
	const uuidRegex = new RegExp(
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
	)
	if (idFromUrl && !uuidRegex.test(idFromUrl)) {
		res.writeHead(400, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify(UUIDIsNotValid))
	} else if (
		baseUrl === '/api/users/' &&
		idFromUrl &&
		uuidRegex.test(idFromUrl)
	) {
		const userToDeleteIndex = users.findIndex((user) => {
			return user.id === idFromUrl
		})
		if (userToDeleteIndex === -1) {
			res.writeHead(404, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify(UserNotFound(idFromUrl)))
		} else {
			users.splice(userToDeleteIndex, 1)
			writeToFile(users)
			res.writeHead(204, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify(users))
		}
	}
}
