/*
  Warnings:

  - You are about to drop the `user_interest` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `interest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "user_interest" DROP CONSTRAINT "user_interest_interest_id_fkey";

-- DropForeignKey
ALTER TABLE "user_interest" DROP CONSTRAINT "user_interest_profile_id_fkey";

-- DropTable
DROP TABLE "user_interest";

-- CreateTable
CREATE TABLE "_InterestToProfile" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InterestToProfile_AB_unique" ON "_InterestToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_InterestToProfile_B_index" ON "_InterestToProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "interest_name_key" ON "interest"("name");

-- AddForeignKey
ALTER TABLE "_InterestToProfile" ADD CONSTRAINT "_InterestToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InterestToProfile" ADD CONSTRAINT "_InterestToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
