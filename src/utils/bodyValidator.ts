import { IUsers } from '../types/types.js'

export const bodyValidator = (body: IUsers) => {
	return (
		(typeof body.age === 'string' &&
			typeof body.username === 'string' &&
			!Array.isArray(body.hobbies)) ||
		!body.hobbies.some((item) => typeof item !== 'string')
	)
}
