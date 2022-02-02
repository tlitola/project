import { validateUser } from '../../../lib/validate'
import { addUser, userExists } from '../../../prisma/User/user'
import signupHandler from './_handler'
import crypto from 'crypto'
import { addKeys } from '../../../prisma/Jwt/Jwt'
import { createTokens } from '../../../lib/JWT'
import { pick } from 'lodash'

const handler = signupHandler().post(async (req, res) => {
  validateUser(req.body)
  await userExists(req.body.useremail)
  const user = await addUser(req.body.user)

  const accessTokenKey = crypto.randomBytes(64).toString('hex')
  const refreshTokenKey = crypto.randomBytes(64).toString('hex')

  const keys = await addKeys(user, accessTokenKey, refreshTokenKey)
  const tokens = await createTokens(user, keys)

  res
    .status(200)
    .json({ user: pick(user, ['email', 'id', 'first_name', 'last_name']), tokens })
})

export default handler
