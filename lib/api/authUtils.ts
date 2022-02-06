export const getAuthCookie = (tokens: {
  accessToken: string
  refreshToken: string
}): string[] => {
  console.log(process.env.HTTPS)
  return [
    `accessToken=${tokens.accessToken}; HttpOnly; ${
      // eslint-disable-next-line no-extra-boolean-cast
      process.env.HTTPS === 'true' ? 'Secure; ' : ''
    }SameSite=strict; Max-Age=86400; Path=/`,
    `refreshToken=${tokens.refreshToken}; HttpOnly; ${
      // eslint-disable-next-line no-extra-boolean-cast
      process.env.HTTPS === 'true' ? 'Secure; ' : ''
    }SameSite=strict; Max-Age=604800; Path=/`,
  ]
}

export const removeAuthCookie = (): string[] => {
  return [
    `accessToken='' HttpOnly; Secure; SameSite=strict; Max-Age=-1; Path=/`,
    `refreshToken=''; HttpOnly; Secure; SameSite=strict; Max-Age=-1; Path=/`,
  ]
}
