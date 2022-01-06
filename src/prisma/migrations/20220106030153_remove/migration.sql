/*
  Warnings:

  - You are about to drop the `UsignGear` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gearsId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsignGear" DROP CONSTRAINT "UsignGear_gearsId_fkey";

-- DropForeignKey
ALTER TABLE "UsignGear" DROP CONSTRAINT "UsignGear_owner_fkey";

-- DropIndex
DROP INDEX "Post_authorId_key";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "gearsId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "UsignGear";

-- CreateTable
CREATE TABLE "_GearsToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GearsToPost_AB_unique" ON "_GearsToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_GearsToPost_B_index" ON "_GearsToPost"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("gearsId") REFERENCES "Gears"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GearsToPost" ADD FOREIGN KEY ("A") REFERENCES "Gears"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GearsToPost" ADD FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
