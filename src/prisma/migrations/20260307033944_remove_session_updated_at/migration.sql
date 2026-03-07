/*
  Warnings:

  - You are about to drop the column `updated_at` on the `session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "session" DROP COLUMN "updated_at",
ALTER COLUMN "expired_at" SET DEFAULT NOW() + INTERVAL '30 days'::interval;
