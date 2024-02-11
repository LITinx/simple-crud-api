import dotenv from 'dotenv'
import http from 'http'

dotenv.config()
const PORT = process.env.PORT || 5001

function sendRequest(method: string, path: string, data: any = null) {
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

describe('GET /api/users', () => {
	test('GET /api/users should return an empty array', async () => {
		const response: any = await sendRequest('GET', '/api/users')
		expect(response.status).toBe(200)
		expect(response.body).toEqual([])
	})
})
