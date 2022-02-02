/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[primaryKey]` on the table `AuthKey` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[secondaryKey]` on the table `AuthKey` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AuthKey" DROP CONSTRAINT "AuthKey_userId_fkey";

-- DropIndex
DROP INDEX "AuthKey_userId_key";

-- AlterTable
ALTER TABLE "AuthKey" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "AuthKey_primaryKey_key" ON "AuthKey"("primaryKey");

-- CreateIndex
CREATE UNIQUE INDEX "AuthKey_secondaryKey_key" ON "AuthKey"("secondaryKey");

-- AddForeignKey
ALTER TABLE "AuthKey" ADD CONSTRAINT "AuthKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
