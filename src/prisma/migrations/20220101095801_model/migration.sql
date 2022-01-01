-- CreateTable
CREATE TABLE "Speacker" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maker" TEXT NOT NULL,
    "webUrl" TEXT NOT NULL,
    "imgUrl" TEXT,

    CONSTRAINT "Speacker_pkey" PRIMARY KEY ("id")
);
