/*
  Warnings:

  - You are about to drop the column `soundCouldId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "soundCouldId",
ADD COLUMN     "soundCloudId" TEXT;
