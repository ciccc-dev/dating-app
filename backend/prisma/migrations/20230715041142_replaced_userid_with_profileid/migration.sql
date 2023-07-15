-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_chat_room_id_fkey";

-- DropForeignKey
ALTER TABLE "photo_url" DROP CONSTRAINT "photo_url_profile_id_fkey";

-- AlterTable
ALTER TABLE "chat" ADD COLUMN     "message" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "chat_room" DROP COLUMN "selectedBy",
DROP COLUMN "selectedUser",
ADD COLUMN     "isOpened" BOOLEAN NOT NULL,
ADD COLUMN     "selected_by" UUID NOT NULL,
ADD COLUMN     "selected_profile" UUID NOT NULL;

-- AlterTable
ALTER TABLE "filter" DROP COLUMN "user_id",
ADD COLUMN     "profile_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "geolocation" DROP COLUMN "user_id",
ADD COLUMN     "profile_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "user_block" DROP COLUMN "blockedBy",
DROP COLUMN "blockedUser",
ADD COLUMN     "blocked_by" UUID NOT NULL,
ADD COLUMN     "blocked_profile" UUID NOT NULL;

-- AlterTable
ALTER TABLE "user_unselected" DROP COLUMN "unselectedBy",
DROP COLUMN "unselectedUser",
ADD COLUMN     "unselected_by" UUID NOT NULL,
ADD COLUMN     "unselected_profile" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "filter_profile_id_key" ON "filter"("profile_id");

-- CreateIndex
CREATE UNIQUE INDEX "geolocation_profile_id_key" ON "geolocation"("profile_id");

-- AddForeignKey
ALTER TABLE "photo_url" ADD CONSTRAINT "photo_url_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filter" ADD CONSTRAINT "filter_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_room" ADD CONSTRAINT "chat_room_selected_by_fkey" FOREIGN KEY ("selected_by") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_room" ADD CONSTRAINT "chat_room_selected_profile_fkey" FOREIGN KEY ("selected_profile") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_chat_room_id_fkey" FOREIGN KEY ("chat_room_id") REFERENCES "chat_room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_sent_by_fkey" FOREIGN KEY ("sent_by") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_unselected" ADD CONSTRAINT "user_unselected_unselected_by_fkey" FOREIGN KEY ("unselected_by") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_unselected" ADD CONSTRAINT "user_unselected_unselected_profile_fkey" FOREIGN KEY ("unselected_profile") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_block" ADD CONSTRAINT "user_block_blocked_by_fkey" FOREIGN KEY ("blocked_by") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_block" ADD CONSTRAINT "user_block_blocked_profile_fkey" FOREIGN KEY ("blocked_profile") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "geolocation" ADD CONSTRAINT "geolocation_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
