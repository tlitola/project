import { NextApiRequest, NextApiResponse } from 'next'
import { validateApiKey } from '../validate'
import nc, { NextConnect, Options } from 'next-connect'

const checkKey = (
	req: NextApiRequest,
	res: NextApiResponse,
	next: () => void
): void => {
	if (!validateApiKey(req.headers)) {
		throw new Error('401|Authentication needed')
	}
	next()
}

export default function withApiKey(
	options?: Options<NextApiRequest, NextApiResponse> | undefined
): NextConnect<NextApiRequest, NextApiResponse> {
	return nc(options).use(checkKey)
}
