import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect, { NextConnect } from 'next-connect'
import withAuth from '../../lib/middleware/withAuth'
import withKey from '../../lib/middleware/withKey'
import Cors from 'cors'
import { AuthKey, User } from '@prisma/client'

export type NextApiRequestWithAuth = NextApiRequest & {
  user: User
  key: AuthKey
}

export default function authHandler(): NextConnect<
  NextApiRequestWithAuth,
  NextApiResponse
> {
  return nextConnect({
    onError: (err: Error, req, res) => {
      let code = 500
      let message = 'Something went wrong'
      if (err.message.includes('|')) {
        code = Number(err.message.split('|')[0])
        message = err.message.split('|')[1]
      }

      if (code < 400 || code > 499) console.error(err.stack)
      ;(res as NextApiResponse).status(code).end(message)
    },
    onNoMatch: (req, res) => {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(res as NextApiResponse).status(404).end('Page is not found')
    },
  })
    .use(
      Cors({
        origin: 'https:localhost:3000',
      })
    )
    .use(withKey)
    .use(withAuth)
}
