import { IncomingMessage, ServerResponse } from 'http'
import { IUsers } from '../types/types.js'

type MessageType =
	| IUsers[]
	| {
			status: number
			body: {
				error: {
					message: string
				}
			}
	  }

export const responseAnswer = (
	res: ServerResponse<IncomingMessage>,
	statusCode: number,
	message?: MessageType,
) => {
	res.writeHead(statusCode, { 'Content-Type': 'application/json' })
	res.end(JSON.stringify(message))
}
