/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_key:
      '6azAH4*iV3z!TNhV*hyEZ!2m3mgQMKiKgnfJxdu*nh4F@FXfUV-cJtoeGwCAAKo7BZFBcDwX.4rofM6C.CLWMxbJNxv2ku6_gQ8Q',
    //URL applied to all requests made to api  
    API_base_url='http://localhost:3000/api'
  },
  serverRuntimeConfig: {
    //Database url, see https://www.prisma.io/docs/reference/database-reference/supported-databases
    DATABASE_URL:
      'file:./dev.db',
    //Whether to use the secure tag in auth cookies or not
    HTTPS: false,
    //Origins the api is allowed to receive requests form
    cors_allowed_origin='http://localhost:3000',
    //URL of the webside used in the JWTs
    base_url='localhost:3000'
  },
}

module.exports = nextConfig
