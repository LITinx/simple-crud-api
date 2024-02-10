export const UUIDIsNotValid = {
	status: 400,
	body: {
		error: {
			message: 'UUID is not valid',
		},
	},
}
export const NotFound = {
	status: 404,
	body: {
		error: {
			message: 'Route not found',
		},
	},
}
export const NotUserFound = (id: string) => ({
	status: 404,
	body: {
		error: {
			message: `User with ID:${id} not found`,
		},
	},
})
