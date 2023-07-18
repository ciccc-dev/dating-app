-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "gender" VARCHAR(30) NOT NULL,
    "sexual_orientation" VARCHAR(30) NOT NULL,
    "about_me" TEXT NOT NULL,
    "purpose" VARCHAR(20)[],
    "registered_at" TIMESTAMPTZ(3) NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_url" (
    "id" UUID NOT NULL,
    "photo_url" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL,
    "registered_at" TIMESTAMPTZ(3) NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "profile_id" UUID NOT NULL,

    CONSTRAINT "photo_url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interest" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "sort_order" INTEGER NOT NULL,

    CONSTRAINT "interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filter" (
    "id" UUID NOT NULL,
    "show_me" VARCHAR(10) NOT NULL,
    "min_age" INTEGER NOT NULL,
    "max_age" INTEGER NOT NULL,
    "is_age_filtered" BOOLEAN NOT NULL,
    "min_distance" INTEGER NOT NULL,
    "max_distance" INTEGER NOT NULL,
    "is_distance_filtered" BOOLEAN NOT NULL,
    "sexual_orientation" VARCHAR(30) NOT NULL,
    "is_sexual_orientation_filtered" BOOLEAN NOT NULL,
    "purpose" VARCHAR(20)[],
    "is_purpose_filtered" BOOLEAN NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "filter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_room" (
    "id" UUID NOT NULL,
    "selectedBy" UUID NOT NULL,
    "selectedUser" UUID NOT NULL,
    "registered_at" TIMESTAMPTZ(3) NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "chat_room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat" (
    "id" UUID NOT NULL,
    "chat_room_id" UUID NOT NULL,
    "sent_by" UUID NOT NULL,
    "has_read" BOOLEAN NOT NULL,
    "timestamp" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_block" (
    "id" UUID NOT NULL,
    "blockedBy" UUID NOT NULL,
    "blockedUser" UUID NOT NULL,
    "registered_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "user_block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "geolocation" (
    "id" UUID NOT NULL,
    "user_id" TEXT NOT NULL,
    "location" VARCHAR(60) NOT NULL,
    "latitude" DECIMAL(17,14) NOT NULL,
    "longtitude" DECIMAL(17,14) NOT NULL,

    CONSTRAINT "geolocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfileInterest" (
    "A" INTEGER NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_FilterInterest" (
    "A" UUID NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileInterest_AB_unique" ON "_ProfileInterest"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileInterest_B_index" ON "_ProfileInterest"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FilterInterest_AB_unique" ON "_FilterInterest"("A", "B");

-- CreateIndex
CREATE INDEX "_FilterInterest_B_index" ON "_FilterInterest"("B");

-- AddForeignKey
ALTER TABLE "photo_url" ADD CONSTRAINT "photo_url_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat" ADD CONSTRAINT "chat_chat_room_id_fkey" FOREIGN KEY ("chat_room_id") REFERENCES "chat_room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileInterest" ADD CONSTRAINT "_ProfileInterest_A_fkey" FOREIGN KEY ("A") REFERENCES "interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileInterest" ADD CONSTRAINT "_ProfileInterest_B_fkey" FOREIGN KEY ("B") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilterInterest" ADD CONSTRAINT "_FilterInterest_A_fkey" FOREIGN KEY ("A") REFERENCES "filter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilterInterest" ADD CONSTRAINT "_FilterInterest_B_fkey" FOREIGN KEY ("B") REFERENCES "interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
