import crypto from 'crypto'
import { IncomingMessage, ServerResponse } from 'http'
import { users } from '../server.js'
import { IRequest, IUsers } from '../types/types.js'
import { bodyParser } from '../utils/bodyParser.js'
import { bodyValidator } from '../utils/bodyValidator.js'
import { writeToFile } from '../utils/writeToFile.js'
import { InvalidBody } from './responseMessages/responseMessages.js'

export const postRequest = async (
	req: IRequest,
	res: ServerResponse<IncomingMessage>,
) => {
	if (req.url === '/api/users') {
		try {
			const body: IUsers = await bodyParser(req)
			if (!bodyValidator(body)) {
				res.writeHead(400, { 'Content-Type': 'application/json' })
				res.end(JSON.stringify(InvalidBody))
			}
			body.id = crypto.randomUUID()
			users.push(body)
			writeToFile(users)
			res.statusCode = 201
			res.setHeader('Content-Type', 'application/json')
			res.end()
		} catch {
			res.writeHead(400, { 'Content-Type': 'application/json' })
			res.end(JSON.stringify(InvalidBody))
		}
	}
}
