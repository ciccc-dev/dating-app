-- CreateTable
CREATE TABLE "likes" (
    "id" UUID NOT NULL,
    "sent_by" TEXT NOT NULL,
    "received_by" TEXT NOT NULL,
    "liked_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "likes_sent_by_idx" ON "likes"("sent_by");

-- CreateIndex
CREATE INDEX "likes_received_by_idx" ON "likes"("received_by");

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_sent_by_fkey" FOREIGN KEY ("sent_by") REFERENCES "profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_received_by_fkey" FOREIGN KEY ("received_by") REFERENCES "profile"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
