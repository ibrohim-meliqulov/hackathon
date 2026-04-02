/*
  Warnings:

  - A unique constraint covering the columns `[telegramId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "telegramId" INTEGER,
ADD COLUMN     "username" TEXT,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "password" SET DEFAULT '',
ALTER COLUMN "surname" SET DEFAULT '',
ALTER COLUMN "region" SET DEFAULT '',
ALTER COLUMN "role" SET DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");
