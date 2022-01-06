/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Gears` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Gears` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gears" DROP CONSTRAINT "Gears_postId_fkey";

-- AlterTable
ALTER TABLE "Gears" DROP COLUMN "categoryId",
DROP COLUMN "postId";
