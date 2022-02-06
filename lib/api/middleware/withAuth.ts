import { AuthKey, User } from '@prisma/client'
import { NextApiResponse } from 'next'
import { NextApiRequestWithAuth } from '../../../pages/api/_authHandler'
import { keyExists } from '@lib/database/Jwt/Jwt'
import { getUser, userActive } from '@lib/database/User/user'
import JWT from '../JWT'
import { validateAuth } from '../validate'

export default async function withAuth(
  req: NextApiRequestWithAuth,
  res: NextApiResponse,
  next: () => void
): Promise<void> {
  validateAuth(req.cookies)
  const accessToken = await JWT.validate(req.cookies.accessToken)
  await userActive('id', accessToken.sub)

  req.key = (await keyExists(accessToken.prm, 'primaryKey')) as AuthKey
  req.user = (await getUser('id', accessToken.sub)) as User

  next()
}
