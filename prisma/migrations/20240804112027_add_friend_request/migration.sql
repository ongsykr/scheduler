-- CreateTable
CREATE TABLE "friend_request" (
    "id" SERIAL NOT NULL,
    "senderId" UUID NOT NULL,
    "receiverId" UUID NOT NULL,
    "request" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "friend_request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "friend_request" ADD CONSTRAINT "friend_request_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friend_request" ADD CONSTRAINT "friend_request_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
