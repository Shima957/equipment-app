/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Gears` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_gearsId_fkey";

-- DropForeignKey
ALTER TABLE "Gears" DROP CONSTRAINT "Gears_id_fkey";

-- AlterTable
ALTER TABLE "Gears" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "postId" INTEGER;

-- DropTable
DROP TABLE "Category";

-- AddForeignKey
ALTER TABLE "Gears" ADD CONSTRAINT "Gears_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
