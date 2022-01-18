/*
  Warnings:

  - You are about to drop the column `avatorUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatorUrl",
ADD COLUMN     "avatarUrl" TEXT;
