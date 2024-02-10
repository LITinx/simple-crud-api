import { IUsers } from '../types/types.js'

export const bodyValidator = (body: IUsers) => {
	return (
		body.hasOwnProperty('username') &&
		body.hasOwnProperty('hobbies') &&
		body.hasOwnProperty('age')
	)
}
