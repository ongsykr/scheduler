/*
  Warnings:

  - You are about to drop the `todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "todo" DROP CONSTRAINT "todo_userId_fkey";

-- DropTable
DROP TABLE "todo";

-- CreateTable
CREATE TABLE "schedule" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "starting_date" TIMESTAMP(3) NOT NULL,
    "ending_date" TIMESTAMP(3),
    "cycle" INTEGER,
    "bool" BOOLEAN NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
