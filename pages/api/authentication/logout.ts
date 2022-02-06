import { removeKey } from '@lib/database/Jwt/Jwt'
import { removeAuthCookie } from '@lib/api/authUtils'
import authHandler from '../_authHandler'

const handler = authHandler().get(async (req, res) => {
  await removeKey(req.key.primaryKey, 'primaryKey')
  res
    .status(200)
    .setHeader('Set-Cookie', removeAuthCookie())
    .setHeader('Content-Type', 'text/plain')
    .send('Logged out')
})

export default handler
