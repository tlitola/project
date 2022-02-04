import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect, { NextConnect } from 'next-connect'
import withAuth from '@lib/api/middleware/withAuth'
import withKey from '@lib/api/middleware/withKey'
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

      if (code < 400 || code > 499 || process.env.NODE_ENV === 'development')
        console.error(err.stack)
      ;(res as NextApiResponse)
        .status(code)
        .setHeader('Content-Type', 'text/plain')
        .end(message)
    },
    onNoMatch: (req, res) => {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(res as NextApiResponse)
        .status(404)
        .setHeader('Content-Type', 'text/plain')
        .end('Page not found')
    },
  })
    .use(
      Cors({
        origin: process.env.cors_allowed_origin,
      })
    )
    .use(withKey)
    .use(withAuth)
}
