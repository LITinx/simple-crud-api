import { IncomingMessage, ServerResponse } from 'http'
import { users, uuidRegex } from '../server.js'
import { IRequest } from '../types/types.js'
import { bodyParser } from '../utils/bodyParser.js'
import { getUrlInfo } from '../utils/getUrlInfo.js'
import { responseAnswer } from '../utils/responseAnswer.js'
import {
	NotFound,
	UUIDIsNotValid,
	UserNotFound,
} from '../utils/responseMessages.js'
import { writeToFile } from '../utils/writeToFile.js'

export const putRequest = async (
	req: IRequest,
	res: ServerResponse<IncomingMessage>,
) => {
	const { baseUrl, idFromUrl } = getUrlInfo(req)

	if (idFromUrl && !uuidRegex.test(idFromUrl)) {
		responseAnswer(res, 400, UUIDIsNotValid)
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
			responseAnswer(res, 404, UserNotFound(idFromUrl))
		} else {
			const ownId = users[userToUpdateIndex].id
			users[userToUpdateIndex] = { ...body, id: ownId }

			console.log('put', users)
			writeToFile(users)
			responseAnswer(res, 200, users)
		}
	} else {
		responseAnswer(res, 404, NotFound)
	}
}
