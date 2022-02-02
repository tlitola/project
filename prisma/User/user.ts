import { User } from '@prisma/client'
import prisma from '../client'
import { v4 as uuidv4 } from 'uuid'
import argon2 from 'argon2'

export const userExists = async (email: string): Promise<void> => {
  let exists = false
  try {
    exists =
      (await prisma.user.count({
        where: {
          email,
        },
      })) > 0
  } catch (e) {
    console.error(e)
    throw new Error('500|Something went wrong')
  }

  if (exists) {
    throw new Error('400|Incorrect user data')
  }
}

export const addUser = async (data: User): Promise<User> => {
  let user: User
  try {
    user = await prisma.user.create({
      data: { ...data, password: await argon2.hash(data.password), id: uuidv4() },
    })
  } catch (e) {
    console.error(e)
    throw new Error('500|Something went wrong')
  }
  return user
}
