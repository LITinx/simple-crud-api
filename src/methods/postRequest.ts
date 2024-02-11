import crypto from 'crypto'
import { IncomingMessage, ServerResponse } from 'http'
import { users } from '../server.js'
import { IRequest, IUsers } from '../types/types.js'
import { bodyParser } from '../utils/bodyParser.js'
import { bodyValidator } from '../utils/bodyValidator.js'
import { responseAnswer } from '../utils/responseAnswer.js'
import { InvalidBody } from '../utils/responseMessages.js'
import { writeToFile } from '../utils/writeToFile.js'

export const postRequest = async (
	req: IRequest,
	res: ServerResponse<IncomingMessage>,
) => {
	if (req.url === '/api/users') {
		try {
			const body: IUsers = await bodyParser(req)
			if (!bodyValidator(body)) {
				responseAnswer(res, 400, InvalidBody)
			}
			body.id = crypto.randomUUID()
			users.push(body)
			console.log('post', users)

			writeToFile(users)
			responseAnswer(res, 201, users)
		} catch {
			responseAnswer(res, 400, InvalidBody)
		}
	}
}
