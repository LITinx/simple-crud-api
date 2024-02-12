import { IncomingMessage } from 'http'

export const getUrlInfo = (req: IncomingMessage) => {
	const baseUrl = req.url?.substring(0, req.url.lastIndexOf('/') + 1)
	const idFromUrl = req.url?.split('/')[3]
	return { baseUrl, idFromUrl }
}
