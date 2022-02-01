import { NextApiRequest, NextApiResponse } from 'next'

export const withAuth = (handler: {
	(req: NextApiRequest, res: NextApiResponse): Promise<void>
}) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const token = true
		if (!token) {
			return res.status(200).json({ foo: 'bar' })
		}
		return handler(req, res)
	}
}
