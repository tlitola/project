import { validateUser } from '../../../lib/validate'
import { addUser, userExists } from '../../../prisma/User/user'
import apiKeyHandler from '../_apiKeyHandler'
import crypto from 'crypto'
import { addKeys } from '../../../prisma/Jwt/Jwt'
import { createTokens } from '../../../lib/JWT'
import { pick } from 'lodash'
import { getAuthCookie } from '../../../lib/authUtils'

const handler = apiKeyHandler().post(async (req, res) => {
  validateUser(req.body)
  await userExists('email', req.body.user.email)
  const user = await addUser(req.body.user)

  const accessTokenKey = crypto.randomBytes(64).toString('hex')
  const refreshTokenKey = crypto.randomBytes(64).toString('hex')

  const keys = await addKeys(user, accessTokenKey, refreshTokenKey)
  const tokens = await createTokens(user, keys)
  res
    .status(201)
    .setHeader('Set-Cookie', getAuthCookie(tokens))
    .json({ user: pick(user, ['email', 'id', 'first_name', 'last_name']) })
})

export default handler
