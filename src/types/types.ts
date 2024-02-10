import { IncomingMessage } from 'http'

export interface IUsers {
	id: string
	username: string
	age: string
	hobbies: Array<string>
}
export interface IRequest extends IncomingMessage {
	body: IUsers
}
