import { IncomingMessage, ServerResponse } from 'http'
import { users, uuidRegex } from '../server.js'
import { getUrlInfo } from '../utils/getUrlInfo.js'
import { responseAnswer } from '../utils/responseAnswer.js'
import {
	UUIDIsNotValid,
	UserNotFound,
	UserSuccessfullyDeleted,
} from '../utils/responseMessages.js'
import { writeToFile } from '../utils/writeToFile.js'

export const deleteRequest = (
	req: IncomingMessage,
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
		const userToDeleteIndex = users.findIndex((user) => {
			return user.id === idFromUrl
		})
		if (userToDeleteIndex === -1) {
			responseAnswer(res, 404, UserNotFound(idFromUrl))
		} else {
			users.splice(userToDeleteIndex, 1)

			console.log('delete', users)

			writeToFile(users)
			responseAnswer(res, 204)
		}
	}
}
