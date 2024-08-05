/*
  Warnings:

  - Added the required column `message` to the `friend_request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "friend_request" ADD COLUMN     "message" TEXT NOT NULL;
