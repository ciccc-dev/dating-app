/*
  Warnings:

  - You are about to drop the `filter_interest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "filter_interest" DROP CONSTRAINT "filter_interest_filter_id_fkey";

-- DropForeignKey
ALTER TABLE "filter_interest" DROP CONSTRAINT "filter_interest_interest_id_fkey";

-- DropTable
DROP TABLE "filter_interest";

-- CreateTable
CREATE TABLE "_FilterToInterest" (
    "A" UUID NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FilterToInterest_AB_unique" ON "_FilterToInterest"("A", "B");

-- CreateIndex
CREATE INDEX "_FilterToInterest_B_index" ON "_FilterToInterest"("B");

-- AddForeignKey
ALTER TABLE "_FilterToInterest" ADD CONSTRAINT "_FilterToInterest_A_fkey" FOREIGN KEY ("A") REFERENCES "filter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilterToInterest" ADD CONSTRAINT "_FilterToInterest_B_fkey" FOREIGN KEY ("B") REFERENCES "interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
