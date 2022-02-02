import { IncomingHttpHeaders } from 'http'
import Joi from 'joi'
import { NextApiRequest } from 'next'

const apiSchema = Joi.object()
  .keys({
    'x-api-key': Joi.string().required(),
  })
  .unknown(true)

export const validateApiKey = (headers: IncomingHttpHeaders): void => {
  const { error } = apiSchema.validate(headers)

  if (error !== undefined) throw new Error('401|Authentication needed')
}

const userSchema = Joi.object().keys({
  first_name: Joi.string().trim().token().min(3).max(30).label('First name'),
  last_name: Joi.string().trim().token().min(3).max(30).label('Last name'),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .label('Email'),
  password: Joi.string().trim().min(8).label('Password'),
})
export const validateUser = (body: NextApiRequest['body']): void => {
  const { error } = userSchema.validate(body.user)

  if (error !== undefined) throw new Error('400|Incorrect user data')
}
