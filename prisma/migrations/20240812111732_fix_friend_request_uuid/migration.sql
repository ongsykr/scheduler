/*
  Warnings:

  - You are about to drop the column `receiverId` on the `friend_request` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `friend_request` table. All the data in the column will be lost.
  - Added the required column `receiverUuid` to the `friend_request` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderUuid` to the `friend_request` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "friend_request" DROP CONSTRAINT "friend_request_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "friend_request" DROP CONSTRAINT "friend_request_senderId_fkey";

-- AlterTable
ALTER TABLE "friend_request" DROP COLUMN "receiverId",
DROP COLUMN "senderId",
ADD COLUMN     "receiverUuid" UUID NOT NULL,
ADD COLUMN     "senderUuid" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "friend_request" ADD CONSTRAINT "friend_request_senderUuid_fkey" FOREIGN KEY ("senderUuid") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend_request" ADD CONSTRAINT "friend_request_receiverUuid_fkey" FOREIGN KEY ("receiverUuid") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
