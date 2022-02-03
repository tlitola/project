import { NextApiRequest, NextApiResponse } from 'next'
import { validateApiKey } from '../validate'
import prisma from '../../prisma/client'

export default async function withKey(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
): Promise<void> {
  validateApiKey(req.headers)

  const key =
    (await prisma.apiKey.count({
      where: {
        active: true,
        key: req.headers['x-api-key'] as string,
      },
    })) > 0

  if (!key) throw new Error('401|Authentication needed')
  next()
}
