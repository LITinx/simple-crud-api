import { IUsers } from '../types/types.js'

export const bodyValidator = (body: IUsers) => {
	return (
		typeof body.age === 'string' &&
		typeof body.username === 'string' &&
		typeof body.hobbies === 'object'
	)
}
