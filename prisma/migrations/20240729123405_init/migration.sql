-- CreateTable
CREATE TABLE "user" (
    "uuid" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Friend" (
    "userUuid1" UUID NOT NULL,
    "userUuid2" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "starting_date" TIMESTAMP(3) NOT NULL,
    "ending_date" TIMESTAMP(3),
    "cycle" INTEGER,
    "bool" BOOLEAN NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_userUuid1_userUuid2_key" ON "Friend"("userUuid1", "userUuid2");

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userUuid1_fkey" FOREIGN KEY ("userUuid1") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friend" ADD CONSTRAINT "Friend_userUuid2_fkey" FOREIGN KEY ("userUuid2") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
