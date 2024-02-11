import { IncomingMessage, ServerResponse } from 'http'
import { users, uuidRegex } from '../server.js'
import { responseAnswer } from '../utils/responseAnswer.js'
import {
	NotFound,
	UUIDIsNotValid,
	UserNotFound,
} from './responseMessages/responseMessages.js'
import { getUrlInfo } from '../utils/getUrlInfo.js'

export const getRequest = (
	req: IncomingMessage,
	res: ServerResponse<IncomingMessage>,
) => {
	const { baseUrl, idFromUrl } = getUrlInfo(req)

	if (req.url === '/api/users') {
		responseAnswer(res, 200, users)
	} else if (idFromUrl && !uuidRegex.test(idFromUrl)) {
		responseAnswer(res, 400, UUIDIsNotValid)
	} else if (
		baseUrl === '/api/users/' &&
		idFromUrl &&
		uuidRegex.test(idFromUrl)
	) {
		const responseUsers = users.filter((user) => {
			return user.id === idFromUrl
		})
		if (responseUsers.length > 0) {
			responseAnswer(res, 200, responseUsers)
		} else {
			responseAnswer(res, 404, UserNotFound(idFromUrl))
		}
	} else {
		responseAnswer(res, 404, NotFound)
	}
}
