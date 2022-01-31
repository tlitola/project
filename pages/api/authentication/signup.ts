// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

const addUser = async (data: User): Promise<User[]> => {
	const users = await prisma.user.findMany()
	return users
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<User[] | Error>
): Promise<void> {
	return addUser(req.body)
		.then((users: User[]) => {
			res.status(200).json(users)
		})
		.catch((e: Error) => res.status(401).json(e))
		.finally(async () => {
			await prisma.$disconnect()
		})
}
