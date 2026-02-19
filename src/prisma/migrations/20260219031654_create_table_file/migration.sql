-- CreateTable
CREATE TABLE "file" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255),
    "url" TEXT NOT NULL,
    "download_url" TEXT NOT NULL,
    "size" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" UUID,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
