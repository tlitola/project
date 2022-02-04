export const getAuthCookie = (tokens: {
  accessToken: string
  refreshToken: string
}): string[] => {
  return [
    `accessToken=${tokens.accessToken}; HttpOnly; Secure; SameSite=strict; Max-Age=86400; Path=/`,
    `refreshToken=${tokens.refreshToken}; HttpOnly; Secure; SameSite=strict; Max-Age=604800; Path=/`,
  ]
}

export const removeAuthCookie = (): string[] => {
  return [
    `accessToken='' HttpOnly; Secure; SameSite=strict; Max-Age=-1; Path=/`,
    `refreshToken=''; HttpOnly; Secure; SameSite=strict; Max-Age=-1; Path=/`,
  ]
}
