-- AlterTable
ALTER TABLE "filter" ADD COLUMN     "is_interest_filtered" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "min_age" SET DEFAULT 0,
ALTER COLUMN "max_age" SET DEFAULT 100,
ALTER COLUMN "is_age_filtered" SET DEFAULT false,
ALTER COLUMN "is_distance_filtered" SET DEFAULT false,
ALTER COLUMN "is_sexual_orientation_filtered" SET DEFAULT false,
ALTER COLUMN "is_purpose_filtered" SET DEFAULT false,
ALTER COLUMN "distance" SET DEFAULT 50;
