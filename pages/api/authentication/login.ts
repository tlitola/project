import { validateLogin } from '@lib/api/validate'
import { getUser, userActive } from '@lib/database/User/user'
import apiKeyHandler from '../_apiKeyHandler'
import crypto from 'crypto'
import { addKeys, keyExists } from '@lib/database/Jwt/Jwt'
import JWT, { createTokens } from '@lib/api/JWT'
import { pick } from 'lodash'
import { getAuthCookie } from '@lib/api/authUtils'
import { User } from '@prisma/client'
import argon2 from 'argon2'

const handler = apiKeyHandler().post(async (req, res) => {
  validateLogin(req.body)
  await userActive('email', req.body.user.email)

  if (req.cookies.accessToken !== undefined) {
    let notFound = false

    try {
      const token = await JWT.validate(req.cookies.accessToken)
      await keyExists(token.prm, 'primaryKey')
    } catch (e) {
      notFound = true
    }
    if (!notFound) throw new Error('201|Already authenticated')
  }

  const user = (await getUser('email', req.body.user.email)) as User

  if (!(await argon2.verify(user.password, req.body.user.password)))
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
