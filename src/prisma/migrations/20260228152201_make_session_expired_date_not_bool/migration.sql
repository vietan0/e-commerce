/*
  Warnings:

  - You are about to drop the column `expired` on the `session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "session" DROP COLUMN "expired",
ADD COLUMN     "expired_at" TIMESTAMP(3) NOT NULL DEFAULT NOW() + INTERVAL '30 days';
