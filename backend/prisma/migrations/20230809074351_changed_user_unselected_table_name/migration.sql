/*
  Warnings:

  - You are about to drop the `user_block` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_unselected` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_block" DROP CONSTRAINT "user_block_blocked_by_fkey";

-- DropForeignKey
ALTER TABLE "user_block" DROP CONSTRAINT "user_block_blocked_profile_fkey";

-- DropForeignKey
ALTER TABLE "user_unselected" DROP CONSTRAINT "user_unselected_unselected_by_fkey";

-- DropForeignKey
ALTER TABLE "user_unselected" DROP CONSTRAINT "user_unselected_unselected_profile_fkey";

-- DropTable
DROP TABLE "user_block";

-- DropTable
DROP TABLE "user_unselected";

-- CreateTable
CREATE TABLE "profile_unselected" (
    "id" UUID NOT NULL,
    "unselected_by" UUID NOT NULL,
    "unselected_profile" UUID NOT NULL,
    "registered_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "profile_unselected_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_blocked" (
    "id" UUID NOT NULL,
    "blocked_by" UUID NOT NULL,
    "blocked_profile" UUID NOT NULL,
    "registered_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "profile_blocked_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "profile_unselected_unselected_by_idx" ON "profile_unselected"("unselected_by");

-- CreateIndex
CREATE INDEX "profile_unselected_unselected_profile_idx" ON "profile_unselected"("unselected_profile");

-- CreateIndex
CREATE INDEX "profile_blocked_blocked_by_idx" ON "profile_blocked"("blocked_by");

-- CreateIndex
CREATE INDEX "profile_blocked_blocked_profile_idx" ON "profile_blocked"("blocked_profile");

-- AddForeignKey
ALTER TABLE "profile_unselected" ADD CONSTRAINT "profile_unselected_unselected_by_fkey" FOREIGN KEY ("unselected_by") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_unselected" ADD CONSTRAINT "profile_unselected_unselected_profile_fkey" FOREIGN KEY ("unselected_profile") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_blocked" ADD CONSTRAINT "profile_blocked_blocked_by_fkey" FOREIGN KEY ("blocked_by") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_blocked" ADD CONSTRAINT "profile_blocked_blocked_profile_fkey" FOREIGN KEY ("blocked_profile") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
