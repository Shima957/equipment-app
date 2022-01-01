/*
  Warnings:

  - Added the required column `webUrl` to the `DAW` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DAW" ADD COLUMN     "webUrl" TEXT NOT NULL;
