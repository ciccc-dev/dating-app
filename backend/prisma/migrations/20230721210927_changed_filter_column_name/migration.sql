/*
  Warnings:

  - You are about to drop the column `sexual_orientation` on the `filter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "filter" DROP COLUMN "sexual_orientation",
ADD COLUMN     "sexual_orientations" VARCHAR(30)[];
