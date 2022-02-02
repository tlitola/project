import { IncomingHttpHeaders } from 'http'
import Joi from 'joi'

const apiSchema = Joi.object()
	.keys({
		'x-api-key': Joi.string().required(),
	})
	.unknown(true)

export const validateApiKey = (headers: IncomingHttpHeaders): boolean => {
	const { error } = apiSchema.validate(headers)

	return error === undefined
}
