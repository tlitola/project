import { userActive } from '@prisma_folder/User/user'
import Joi, { string } from 'joi'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import JWT from '../JWT'
import { validateAuth } from '../validate'

const tokenSchema = Joi.object()
  .keys({
    accessToken: Joi.string().required(),
    refreshToken: Joi.string().required(),
  })
  .unknown(true)

export const protectClientRequest = async (
  ctx: GetServerSidePropsContext
): Promise<boolean> => {
  try {
    validateAuth(ctx.req.cookies)
    const accessToken = await JWT.validate(ctx.req.cookies.accessToken)
    await userActive('id', accessToken.sub)
    return false
  } catch (e) {
    if (!ctx.req.headers.referer) {
      ctx.res.setHeader('location', '/login')
      ctx.res.statusCode = 302
      ctx.res.end()
    }
    return true
  }
}
