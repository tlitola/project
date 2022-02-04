import { validateAuth, validateRefresh, validateUser } from '../../../lib/validate'
import { addUser, getUser, userActive, userExists } from '../../../prisma/User/user'
import apiKeyHandler from '../_apiKeyHandler'
import crypto from 'crypto'
import { addKeys, keyExists, removeKey } from '../../../prisma/Jwt/Jwt'
import JWT, { createTokens } from '../../../lib/JWT'
import { pick } from 'lodash'
import { getAuthCookie } from '../../../lib/authUtils'
import { User } from '@prisma/client'

const handler = apiKeyHandler().get(async (req, res) => {
  validateRefresh(req.cookies)
  const refreshToken = await JWT.validate(req.cookies.refreshToken)
  await userActive('id', refreshToken.sub)

  if (
    (await keyExists(refreshToken.prm, 'secondaryKey'))?.userId !== refreshToken.sub
  )
    throw new Error('401|Authentication required')

  await removeKey(refreshToken.prm, 'secondaryKey')

  const accessTokenKey = crypto.randomBytes(64).toString('hex')
  const refreshTokenKey = crypto.randomBytes(64).toString('hex')

  const user = (await getUser('id', refreshToken.sub)) as User

  const keys = await addKeys(user, accessTokenKey, refreshTokenKey)
  const tokens = await createTokens(user, keys)
  res
    .status(200)
    .setHeader('Set-Cookie', getAuthCookie(tokens))
    .json({ user: pick(user, ['email', 'id', 'first_name', 'last_name']) })
})

export default handler
