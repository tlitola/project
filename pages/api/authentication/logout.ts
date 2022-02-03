import { removeKey } from '../../../prisma/Jwt/Jwt'
import { removeAuthCookie } from '../../../lib/authUtils'
import authHandler from '../_authHandler'

const handler = authHandler().get(async (req, res) => {
  await removeKey(req.key.primaryKey, 'primaryKey')
  res.status(200).setHeader('Set-Cookie', removeAuthCookie()).send('Logged out')
})

export default handler
