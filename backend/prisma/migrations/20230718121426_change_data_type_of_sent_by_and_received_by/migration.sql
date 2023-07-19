-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_sent_by_fkey";

-- AlterTable
ALTER TABLE "chat" ALTER COLUMN "sent_by" SET DATA TYPE TEXT,
ALTER COLUMN "received_by" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_sent_by_fkey" FOREIGN KEY ("sent_by") REFERENCES "profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
