-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "display_name" TEXT,
    "avatar_url" TEXT,
    "email" TEXT NOT NULL,
    "twitter_id" TEXT,
    "soundcloud_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "author_id" TEXT NOT NULL,
    "gearsId" INTEGER,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gears" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maker" TEXT NOT NULL,
    "webUrl" TEXT,
    "imgUrl" TEXT,

    CONSTRAINT "gears_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_gearsTopost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_id_key" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_gearsTopost_AB_unique" ON "_gearsTopost"("A", "B");

-- CreateIndex
CREATE INDEX "_gearsTopost_B_index" ON "_gearsTopost"("B");

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD FOREIGN KEY ("gearsId") REFERENCES "gears"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gearsTopost" ADD FOREIGN KEY ("A") REFERENCES "gears"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gearsTopost" ADD FOREIGN KEY ("B") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
