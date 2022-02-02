import { PrismaClient } from '@prisma/client'

// add prisma to the NodeJS global type

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Global {}
  }
}

interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient
}

// Prevent multiple instances of Prisma Client in development

declare const global: CustomNodeJsGlobal

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
