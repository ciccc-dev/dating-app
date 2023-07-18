/*
  Warnings:

  - You are about to drop the column `chat_room_id` on the `chat` table. All the data in the column will be lost.
  - Added the required column `received_by` to the `chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_chat_room_id_fkey";

-- DropIndex
DROP INDEX "chat_chat_room_id_idx";

-- AlterTable
ALTER TABLE "chat" DROP COLUMN "chat_room_id",
ADD COLUMN     "received_by" UUID NOT NULL;
