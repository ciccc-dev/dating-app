/*
  Warnings:

  - You are about to drop the column `purpose` on the `filter` table. All the data in the column will be lost.
  - You are about to drop the `_FilterInterest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FilterInterest" DROP CONSTRAINT "_FilterInterest_A_fkey";

-- DropForeignKey
ALTER TABLE "_FilterInterest" DROP CONSTRAINT "_FilterInterest_B_fkey";

-- AlterTable
ALTER TABLE "filter" DROP COLUMN "purpose",
ADD COLUMN     "purposes" VARCHAR(20)[];

-- DropTable
DROP TABLE "_FilterInterest";

-- CreateTable
CREATE TABLE "filter_interest" (
    "filter_id" UUID NOT NULL,
    "interest_id" INTEGER NOT NULL,

    CONSTRAINT "filter_interest_pkey" PRIMARY KEY ("filter_id","interest_id")
);

-- CreateIndex
CREATE INDEX "filter_interest_interest_id_idx" ON "filter_interest"("interest_id");

-- AddForeignKey
ALTER TABLE "filter_interest" ADD CONSTRAINT "filter_interest_filter_id_fkey" FOREIGN KEY ("filter_id") REFERENCES "filter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filter_interest" ADD CONSTRAINT "filter_interest_interest_id_fkey" FOREIGN KEY ("interest_id") REFERENCES "interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
