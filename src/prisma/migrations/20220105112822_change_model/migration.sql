/*
  Warnings:

  - You are about to drop the column `daw` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Daw` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Speacker` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "daw";

-- DropTable
DROP TABLE "Daw";

-- DropTable
DROP TABLE "Speacker";

-- CreateTable
CREATE TABLE "Gears" (
    "id" SERIAL NOT NULL,
    "categoryId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "maker" TEXT NOT NULL,
    "webUrl" TEXT,
    "imgUrl" TEXT,

    CONSTRAINT "Gears_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "gearsId" INTEGER,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Gears" ADD CONSTRAINT "Gears_id_fkey" FOREIGN KEY ("id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_gearsId_fkey" FOREIGN KEY ("gearsId") REFERENCES "Gears"("id") ON DELETE SET NULL ON UPDATE CASCADE;
