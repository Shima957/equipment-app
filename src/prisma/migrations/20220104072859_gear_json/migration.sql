-- CreateTable
CREATE TABLE "Gear" (
    "id" SERIAL NOT NULL,
    "daw" JSONB[],
    "speaker" JSONB[],

    CONSTRAINT "Gear_pkey" PRIMARY KEY ("id")
);
