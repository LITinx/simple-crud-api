import dotenv from 'dotenv'
import http from 'http'
import { IUsers } from '../src/types/types.js'
dotenv.config()
const PORT = process.env.PORT || 5001
interface ApiResponse {
	status: number | undefined
	body: any
}

const sendRequest = (
	method: string,
	path: string,
	data: any = null,
): Promise<ApiResponse> => {
	return new Promise((resolve, reject) => {
		const options = {
			method: method,
			hostname: 'localhost',
			port: PORT,
			path: path,
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const req = http.request(options, (res) => {
			let responseBody = ''
			res.on('data', (chunk) => {
				responseBody += chunk
			})

			res.on('end', () => {
				resolve({
					status: res.statusCode,
					body: responseBody ? JSON.parse(responseBody) : null,
				})
			})
		})

		req.on('error', (err) => {
			reject(err)
		})

		if (data) {
			req.write(JSON.stringify(data))
		}

		req.end()
	})
}

describe('API Tests', () => {
	let userId: string | undefined
	test('GET /api/users should return an empty array', async () => {
		const response: any = await sendRequest('GET', '/api/users')
		expect(response.status).toBe(200)
		expect(response.body).toEqual([])
	})

	test('POST /api/users should create a new user', async () => {
		const newUser: IUsers = {
			username: 'John Doe',
			age: '23',
			hobbies: ['Hiking'],
		}
		const response: ApiResponse = await sendRequest(
			'POST',
			'/api/users',
			newUser,
		)
		expect(response.status).toBe(201)
		expect(response.body[0]).toHaveProperty('id')

		userId = response.body[0]['id']
	})

	test('GET /api/users/:userId should return the created user', async () => {
		if (!userId) {
			throw new Error('User ID is not found')
		}
		const response: ApiResponse = await sendRequest(
			'GET',
			`/api/users/${userId}`,
		)
		expect(response.status).toBe(200)
		expect(response.body[0]).toHaveProperty('id', userId)
	})

	test('PUT /api/users/:userId should update the user', async () => {
		if (!userId) {
			throw new Error('User ID is not found')
		}
		const updatedUser: IUsers = {
			id: userId,
			username: 'Updated Name',
			age: '23',
			hobbies: ['skiing'],
		}
		const response: ApiResponse = await sendRequest(
			'PUT',
			`/api/users/${userId}`,
			updatedUser,
		)
		expect(response.status).toBe(200)
		expect(response.body[0]).toEqual(updatedUser)
	})

	test('DELETE /api/users/:userId should delete the user', async () => {
		if (!userId) {
			throw new Error('User ID is not found')
		}
		const response: ApiResponse = await sendRequest(
			'DELETE',
			`/api/users/${userId}`,
		)
		expect(response.status).toBe(204)
	})

	test('GET /api/users/:userId after deletion should return Not Found', async () => {
		if (!userId) {
			throw new Error('User ID is not defined')
		}
		const response: ApiResponse = await sendRequest(
			'GET',
			`/api/users/${userId}`,
		)
		expect(response.status).toBe(404)
		expect(response.body.body.error.message).toEqual(
			`User with ID:${userId} not found`,
		)
	})
})
