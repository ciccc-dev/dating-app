-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_received_by_fkey" FOREIGN KEY ("received_by") REFERENCES "profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
