import { User } from '@prisma/client'
import prisma from '../client'
import { v4 as uuidv4 } from 'uuid'
import argon2 from 'argon2'

export const userExists = async (criteria: string, value: string): Promise<void> => {
  let exists = false
  try {
    exists =
      (
        await prisma.user.findMany({
          where: {
            [criteria]: value,
          },
        })
      ).length > 0
  } catch (e) {
    console.error(e)
    throw new Error('500|Something went wrong')
  }

  if (exists) {
    throw new Error('400|Incorrect user data')
  }
}

export const userActive = async (criteria: string, value: string): Promise<void> => {
  let exists = false
  try {
    exists =
      (
        await prisma.user.findMany({
          where: {
            [criteria]: value,
            active: true,
          },
        })
      ).length > 0
  } catch (e) {
    console.error(e)
    throw new Error('500|Something went wrong')
  }

  if (!exists) {
    throw new Error('401|Authentication needed')
  }
}

export const addUser = async (data: User): Promise<User> => {
  let user: User
  try {
    user = await prisma.user.create({
      data: {
        ...data,
        password: await argon2.hash(data.password),
        id: uuidv4(),
      },
    })
  } catch (e) {
    console.error(e)
    throw new Error('500|Something went wrong')
  }
  return user
}

export const getUser = async (key: string, value: string): Promise<User | null> => {
  let user: User | null
  try {
    user = await prisma.user.findUnique({
      where: {
        [key]: value,
      },
    })
  } catch (e) {
    console.error(e)
    throw new Error('500|Something went wrong')
  }
  return user
}
