import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, User } from '@prisma/client'
import { withAuth } from '../../../middleware/withAuth'

const prisma = new PrismaClient()

const addUser = async (data: User): Promise<User[]> => {
	const users = await prisma.user.findMany()
	return users
}

const handler = (
	req: NextApiRequest,
	res: NextApiResponse<User[] | Error>
): Promise<void> => {
	return addUser(req.body)
		.then((users: User[]) => {
			res.status(200).json(users)
		})
		.catch((e: Error) => res.status(401).json(e))
		.finally(async () => {
			await prisma.$disconnect()
		})
}

export default withAuth(handler)
