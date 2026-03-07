-- AlterTable
ALTER TABLE "session" ALTER COLUMN "session_id" SET DATA TYPE TEXT,
ALTER COLUMN "expired_at" SET DEFAULT NOW() + INTERVAL '30 days';
