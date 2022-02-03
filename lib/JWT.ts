import { AuthKey, User } from '@prisma/client'
import { readFile } from 'fs/promises'
import { sign, verify } from 'jsonwebtoken'
import path from 'path'

interface JWTinfo {
  aud: string
  sub: string
  iss: string
  iat: number
  exp: number
  prm: string
}

export default class JWT {
  private static async readPublicKey(): Promise<string> {
    return await readFile(
      '/Users/touko/Documents/Code/next/project/certificates/public.pem',
      'utf8'
    )
  }

  private static async readPrivateKey(): Promise<string> {
    return await readFile(
      '/Users/touko/Documents/Code/next/project/certificates/private.pem',
      'utf8'
    )
  }

  public static async encode(payload: JWTinfo): Promise<string> {
    const cert = await this.readPrivateKey()
    if (!cert) throw new Error('500|Unable to generate jwt token')

    return sign({ ...payload }, cert, { algorithm: 'RS256' })
  }

  public static async validate(token: string): Promise<JWTinfo> {
    const cert = await this.readPublicKey()
    try {
      return verify(token, cert) as JWTinfo
    } catch (e) {
      console.error(e)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (e && e.name === 'TokenExpiredError')
        throw new Error('401|JWT token expired')
      throw new Error('401|Authentication needed')
    }
  }

  public static async decode(token: string): Promise<JWTinfo> {
    const cert = await this.readPublicKey()
    try {
      return verify(token, cert, {
        ignoreExpiration: true,
      }) as JWTinfo
    } catch (e) {
      console.error(e)
      throw new Error('401|Authentication needed')
    }
  }
}

export const createTokens = async (
  user: User,
  keys: AuthKey
): Promise<{ accessToken: string; refreshToken: string }> => {
  const accessToken = await JWT.encode({
    aud: 'localhost:3000',
    sub: user.id,
    iss: 'localhost:3000',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    prm: keys.primaryKey,
  })

  const refreshToken = await JWT.encode({
    aud: 'localhost:3000',
    sub: user.id,
    iss: 'localhost:3000',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
    prm: keys.secondaryKey,
  })

  if (!accessToken || !refreshToken)
    throw new Error('500|Something went wrong signing tokens')

  return {
    accessToken,
    refreshToken,
  }
}
