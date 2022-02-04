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

export const keyExists = async (
  key: string,
  token: 'primaryKey' | 'secondaryKey'
): Promise<AuthKey | null> => {
  let exists: AuthKey | null
  try {
    exists = await prisma.authKey.findFirst({
      where: {
        [token]: key,
        active: true,
      },
    })
  } catch (e) {
    console.error(e)
    throw new Error('500|Something went wrong')
  }
  if (exists === null) throw new Error('401|Authentication needed')

  return exists
}

export const removeKey = async (
  key: string,
  token: 'primaryKey' | 'secondaryKey'
): Promise<void> => {
  try {
    await prisma.authKey.deleteMany({
      where: {
        [token]: key,
        active: true,
      },
    })
  } catch (e) {
    console.error(e)
    throw new Error('500|Something went wrong')
  }
}
