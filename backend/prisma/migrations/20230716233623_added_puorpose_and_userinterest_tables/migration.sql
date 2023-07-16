/*
  Warnings:

  - You are about to drop the `_ProfileInterest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProfileInterest" DROP CONSTRAINT "_ProfileInterest_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProfileInterest" DROP CONSTRAINT "_ProfileInterest_B_fkey";

-- DropForeignKey
ALTER TABLE "chat" DROP CONSTRAINT "chat_sent_by_fkey";

-- DropForeignKey
ALTER TABLE "chat_room" DROP CONSTRAINT "chat_room_selected_by_fkey";

-- DropForeignKey
ALTER TABLE "chat_room" DROP CONSTRAINT "chat_room_selected_profile_fkey";

-- DropForeignKey
ALTER TABLE "filter" DROP CONSTRAINT "filter_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "geolocation" DROP CONSTRAINT "geolocation_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "photo_url" DROP CONSTRAINT "photo_url_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "user_block" DROP CONSTRAINT "user_block_blocked_by_fkey";

-- DropForeignKey
ALTER TABLE "user_block" DROP CONSTRAINT "user_block_blocked_profile_fkey";

-- DropForeignKey
ALTER TABLE "user_unselected" DROP CONSTRAINT "user_unselected_unselected_by_fkey";

-- DropForeignKey
ALTER TABLE "user_unselected" DROP CONSTRAINT "user_unselected_unselected_profile_fkey";

-- DropTable
DROP TABLE "_ProfileInterest";

-- DropTable
DROP TABLE "profiles";

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "gender" VARCHAR(30) NOT NULL,
    "sexual_orientation" VARCHAR(30) NOT NULL,
    "about_me" TEXT NOT NULL,
    "registered_at" TIMESTAMPTZ(3) NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "purpose" (
    "profile_id" UUID NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "purpose_pkey" PRIMARY KEY ("profile_id","name")
);

-- CreateTable
CREATE TABLE "user_interest" (
    "profile_id" UUID NOT NULL,
    "interest_id" INTEGER NOT NULL,

    CONSTRAINT "user_interest_pkey" PRIMARY KEY ("profile_id","interest_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE INDEX "profile_birthday_idx" ON "profile"("birthday");

-- CreateIndex
CREATE INDEX "profile_gender_idx" ON "profile"("gender");

-- CreateIndex
CREATE INDEX "profile_sexual_orientation_idx" ON "profile"("sexual_orientation");

-- CreateIndex
CREATE INDEX "purpose_name_idx" ON "purpose"("name");

-- CreateIndex
CREATE INDEX "user_interest_interest_id_idx" ON "user_interest"("interest_id");

-- CreateIndex
CREATE INDEX "chat_chat_room_id_idx" ON "chat"("chat_room_id");

-- CreateIndex
CREATE INDEX "chat_room_selected_by_idx" ON "chat_room"("selected_by");

-- CreateIndex
CREATE INDEX "chat_room_selected_profile_idx" ON "chat_room"("selected_profile");

-- CreateIndex
CREATE INDEX "geolocation_latitude_idx" ON "geolocation"("latitude");

-- CreateIndex
CREATE INDEX "geolocation_longtitude_idx" ON "geolocation"("longtitude");

-- CreateIndex
CREATE INDEX "photo_url_profile_id_idx" ON "photo_url"("profile_id");

-- CreateIndex
CREATE INDEX "user_block_blocked_by_idx" ON "user_block"("blocked_by");

-- CreateIndex
CREATE INDEX "user_block_blocked_profile_idx" ON "user_block"("blocked_profile");

-- CreateIndex
CREATE INDEX "user_unselected_unselected_by_idx" ON "user_unselected"("unselected_by");

-- CreateIndex
CREATE INDEX "user_unselected_unselected_profile_idx" ON "user_unselected"("unselected_profile");

-- AddForeignKey
ALTER TABLE "purpose" ADD CONSTRAINT "purpose_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interest" ADD CONSTRAINT "user_interest_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interest" ADD CONSTRAINT "user_interest_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_url" ADD CONSTRAINT "photo_url_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filter" ADD CONSTRAINT "filter_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_room" ADD CONSTRAINT "chat_room_selected_by_fkey" FOREIGN KEY ("selected_by") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_room" ADD CONSTRAINT "chat_room_selected_profile_fkey" FOREIGN KEY ("selected_profile") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_sent_by_fkey" FOREIGN KEY ("sent_by") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_unselected" ADD CONSTRAINT "user_unselected_unselected_by_fkey" FOREIGN KEY ("unselected_by") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_unselected" ADD CONSTRAINT "user_unselected_unselected_profile_fkey" FOREIGN KEY ("unselected_profile") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_block" ADD CONSTRAINT "user_block_blocked_by_fkey" FOREIGN KEY ("blocked_by") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_block" ADD CONSTRAINT "user_block_blocked_profile_fkey" FOREIGN KEY ("blocked_profile") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "geolocation" ADD CONSTRAINT "geolocation_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
