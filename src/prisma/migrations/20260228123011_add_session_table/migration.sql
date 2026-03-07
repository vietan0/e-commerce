-- CreateTable
CREATE TABLE "session" (
    "id" BIGSERIAL NOT NULL,
    "session_id" VARCHAR(255) NOT NULL,
    "expired" BOOLEAN NOT NULL DEFAULT false,
    "browser" VARCHAR(255),
    "browser_version" VARCHAR(255),
    "os" VARCHAR(255),
    "ip" VARCHAR(255),
    "platform" VARCHAR(255),
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
