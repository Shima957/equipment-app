-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Category_id_seq";

-- AlterTable
ALTER TABLE "Gears" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "categoryId" DROP DEFAULT;
DROP SEQUENCE "Gears_id_seq";
DROP SEQUENCE "Gears_categoryId_seq";
