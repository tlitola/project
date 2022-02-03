/*
  Warnings:

  - You are about to drop the column `status` on the `ApiKey` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `AuthKey` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ApiKey" DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "AuthKey" DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "active" SET DEFAULT true;
