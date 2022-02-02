import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, User } from '@prisma/client'
import withApiKey from '../../../lib/middleware/withKey'

const prisma = new PrismaClient()

const addUser = async (data: User): Promise<User[]> => {
	const users = await prisma.user.findMany()
	return users
}

const handler = withApiKey({
	onError: (err: Error, req, res) => {
		const code: string = err.message.split('|')[0]
		const message: string = err.message.split('|')[1]
		if (code !== '401') console.error(err.stack)

		res.status(Number(code)).end(message)
	},
	onNoMatch: (req, res) => {
		res.status(404).end('Page is not found')
	},
}).get(async (req, res) => {
	await addUser(req.body)
		.then((users: User[]) => {
			res.status(200).json(users)
		})
		.finally(async () => {
			await prisma.$disconnect()
		})
})

export default handler
