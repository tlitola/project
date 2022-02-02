-- CreateTable
CREATE TABLE "AuthKey" (
    "userId" INTEGER NOT NULL,
    "primaryKey" TEXT NOT NULL,
    "secondaryKey" TEXT NOT NULL,
    "status" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthKey_userId_key" ON "AuthKey"("userId");

-- AddForeignKey
ALTER TABLE "AuthKey" ADD CONSTRAINT "AuthKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
