-- CreateTable
CREATE TABLE "user_unselected" (
    "id" UUID NOT NULL,
    "unselectedBy" UUID NOT NULL,
    "unselectedUser" UUID NOT NULL,
    "registered_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "user_unselected_pkey" PRIMARY KEY ("id")
);
