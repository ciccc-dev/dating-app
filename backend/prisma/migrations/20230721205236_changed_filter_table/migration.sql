/*
  Warnings:

  - You are about to drop the column `max_distance` on the `filter` table. All the data in the column will be lost.
  - You are about to drop the column `min_distance` on the `filter` table. All the data in the column will be lost.
  - The `sexual_orientation` column on the `filter` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `distance` to the `filter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "filter" DROP COLUMN "max_distance",
DROP COLUMN "min_distance",
ADD COLUMN     "distance" INTEGER NOT NULL,
DROP COLUMN "sexual_orientation",
ADD COLUMN     "sexual_orientation" VARCHAR(30)[];
