/*
  Warnings:

  - You are about to drop the `chat_room` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chat_room" DROP CONSTRAINT "chat_room_selected_by_fkey";

-- DropForeignKey
ALTER TABLE "chat_room" DROP CONSTRAINT "chat_room_selected_profile_fkey";

-- DropTable
DROP TABLE "chat_room";
