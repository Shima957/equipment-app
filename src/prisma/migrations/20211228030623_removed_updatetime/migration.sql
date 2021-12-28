/*
  Warnings:

  - You are about to drop the column `updateDate` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "updateDate",
ALTER COLUMN "avatorUrl" DROP NOT NULL;
