/*
  Warnings:

  - A unique constraint covering the columns `[session_id]` on the table `session` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "session" ALTER COLUMN "expired_at" SET DEFAULT NOW() + INTERVAL '30 days'::interval;

-- CreateIndex
CREATE UNIQUE INDEX "session_session_id_key" ON "session"("session_id");
