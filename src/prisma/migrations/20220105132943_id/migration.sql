-- AlterTable
CREATE SEQUENCE "gears_id_seq";
ALTER TABLE "Gears" ALTER COLUMN "id" SET DEFAULT nextval('gears_id_seq');
ALTER SEQUENCE "gears_id_seq" OWNED BY "Gears"."id";
