import { AuthKey, User } from '@prisma/client'
import prisma from '../client'

export const addKeys = async (
  user: User,
  primaryKey: string,
  secondaryKey: string
): Promise<AuthKey> => {
  let keys: AuthKey
  try {
    keys = await prisma.authKey.create({
      data: { userId: user.id, primaryKey, secondaryKey },
    })
  } catch (e) {
    console.error(e)
    throw new Error('500|Something went wrong')
  }
  return keys
}
