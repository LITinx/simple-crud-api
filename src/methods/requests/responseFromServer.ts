import { IncomingMessage, ServerResponse } from 'http'
import { IUsers } from '../../types/types.js'

interface IMessage {
	status: number
	body: {
		error: {
			message: string
		}
	}
}
type MessageType = IMessage | IUsers[]

export const responseFromServer = (
	res: ServerResponse<IncomingMessage>,
	statusCode: number,
	message: MessageType,
) => {
	res.writeHead(statusCode, { 'Content-Type': 'application/json' })
	res.end(JSON.stringify(message))
}
