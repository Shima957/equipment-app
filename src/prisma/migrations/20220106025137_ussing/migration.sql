/*
  Warnings:

  - You are about to drop the column `gearsId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `_GearsToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_gearsId_fkey";

-- DropForeignKey
ALTER TABLE "_GearsToPost" DROP CONSTRAINT "_GearsToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_GearsToPost" DROP CONSTRAINT "_GearsToPost_B_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "gearsId";

-- DropTable
DROP TABLE "_GearsToPost";

-- CreateTable
CREATE TABLE "UsignGear" (
    "id" SERIAL NOT NULL,
    "gearsId" INTEGER,
    "owner" TEXT NOT NULL,

    CONSTRAINT "UsignGear_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsignGear" ADD CONSTRAINT "UsignGear_gearsId_fkey" FOREIGN KEY ("gearsId") REFERENCES "Gears"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsignGear" ADD CONSTRAINT "UsignGear_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Post"("authorId") ON DELETE RESTRICT ON UPDATE CASCADE;
