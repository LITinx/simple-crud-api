import { IncomingMessage, ServerResponse } from 'http'
import { users } from '../server.js'
import { IRequest } from '../types/types.js'
import { bodyParser } from '../utils/bodyParser.js'
import { writeToFile } from '../utils/writeToFile.js'
import {
	NotFound,
	UUIDIsNotValid,
	UserNotFound,
} from './responseMessages/responseMessages.js'

export const putRequest = async (
	req: IRequest,
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
		const body = await bodyParser(req)
		const userToUpdateIndex = users.findIndex((user) => {
			return user.id === idFromUrl
		})
		if (userToUpdateIndex === -1) {
			res.writeHead(404, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify(UserNotFound(idFromUrl)))
		} else {
			const ownId = users[userToUpdateIndex].id
			users[userToUpdateIndex] = { ...body, id: ownId }
			writeToFile(users)
			res.writeHead(200, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify(users))
		}
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' })
		res.end(JSON.stringify(NotFound))
	}
}
