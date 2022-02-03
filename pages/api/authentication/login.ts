import { validateLogin } from '../../../lib/validate'
import { getUser, userActive } from '../../../prisma/User/user'
import apiKeyHandler from '../_apiKeyHandler'
import crypto from 'crypto'
import { addKeys } from '../../../prisma/Jwt/Jwt'
import { createTokens } from '../../../lib/JWT'
import { pick } from 'lodash'
import { getAuthCookie } from '../../../lib/authUtils'
import { User } from '@prisma/client'
import argon2 from 'argon2'

const handler = apiKeyHandler().post(async (req, res) => {
  validateLogin(req.body)
  await userActive('email', req.body.user.email)

  if (req.cookies.accessToken !== undefined) throw new Error('201|Already logged in')

  const user = (await getUser('email', req.body.user.email)) as User

  if (!argon2.verify(user.password, req.body.user.password))
    throw new Error('400|Incorrect user data')

  const accessTokenKey = crypto.randomBytes(64).toString('hex')
  const refreshTokenKey = crypto.randomBytes(64).toString('hex')

  const keys = await addKeys(user, accessTokenKey, refreshTokenKey)
  const tokens = await createTokens(user, keys)
  res
    .status(200)
    .setHeader('Set-Cookie', getAuthCookie(tokens))
    .json({ user: pick(user, ['email', 'id', 'first_name', 'last_name']) })
})

export default handler
