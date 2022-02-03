import { NextApiRequest, NextApiResponse } from 'next'
import authHandler from './_authHandler'

const handler = authHandler().get((req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send('Success')
})

export default handler
