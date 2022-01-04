/*
  Warnings:

  - You are about to drop the `DAW` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "daw" JSONB[];

-- DropTable
DROP TABLE "DAW";

-- CreateTable
CREATE TABLE "Daw" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maker" TEXT NOT NULL,
    "webUrl" TEXT,
    "imgUrl" TEXT,

    CONSTRAINT "Daw_pkey" PRIMARY KEY ("id")
);
