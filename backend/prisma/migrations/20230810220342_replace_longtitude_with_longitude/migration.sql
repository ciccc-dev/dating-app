/*
  Warnings:

  - You are about to drop the column `longtitude` on the `geolocation` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `geolocation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "geolocation_longtitude_idx";

-- AlterTable
ALTER TABLE "geolocation" DROP COLUMN "longtitude",
ADD COLUMN     "longitude" DECIMAL(17,14) NOT NULL;

-- CreateIndex
CREATE INDEX "geolocation_longitude_idx" ON "geolocation"("longitude");
