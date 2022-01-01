-- CreateTable
CREATE TABLE "DAW" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maker" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "DAW_pkey" PRIMARY KEY ("id")
);
