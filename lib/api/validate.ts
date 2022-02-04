import { IncomingHttpHeaders } from 'http'
import Joi from 'joi'
import { NextApiRequest } from 'next'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'

const apiSchema = Joi.object()
  .keys({
    'x-api-key': Joi.string().required(),
  })
  .unknown(true)

export const validateApiKey = (headers: IncomingHttpHeaders): void => {
  const { error } = apiSchema.validate(headers)

  if (error !== undefined) throw new Error('401|API key needed')
}

const authSchema = Joi.object()
  .keys({
    accessToken: Joi.string().required(),
    refreshToken: Joi.string().required(),
  })
  .unknown(true)

export const validateAuth = (cookies: NextApiRequestCookies): void => {
  const { error } = authSchema.validate(cookies)

  if (error !== undefined) throw new Error('401|' + error.message)
}

const refreshSchema = Joi.object()
  .keys({
    refreshToken: Joi.string().required(),
  })
  .unknown(true)

export const validateRefresh = (cookies: NextApiRequestCookies): void => {
  const { error } = refreshSchema.validate(cookies)

  if (error !== undefined) throw new Error('401|Authentication needed')
}

const userSchema = Joi.object().keys({
  first_name: Joi.string()
    .trim()
    .token()
    .min(3)
    .max(30)
    .label('First name')
    .required(),
  last_name: Joi.string()
    .trim()
    .token()
    .min(3)
    .max(30)
    .label('Last name')
    .required(),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .label('Email')
    .required(),
  password: Joi.string().trim().min(8).label('Password').required(),
})
export const validateUser = (body: NextApiRequest['body']): void => {
  const { error } = userSchema.validate(body.user)

  if (error !== undefined) throw new Error('400|' + error.message)
}

const loginSchema = Joi.object().keys({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .label('Email')
    .required(),
  password: Joi.string().trim().min(8).label('Password').required(),
})

export const validateLogin = (body: NextApiRequest['body']): void => {
  const { error } = loginSchema.validate(body.user)

  if (error !== undefined) throw new Error('400|' + error.message)
}
