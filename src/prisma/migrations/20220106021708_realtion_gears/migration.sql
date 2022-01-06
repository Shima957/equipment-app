/*
  Warnings:

  - Added the required column `gearsId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "gearsId" INTEGER NOT NULL;

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
