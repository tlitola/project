-- CreateTable
CREATE TABLE "ApiKey" (
    "key" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "data" TEXT,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_key_key" ON "ApiKey"("key");
