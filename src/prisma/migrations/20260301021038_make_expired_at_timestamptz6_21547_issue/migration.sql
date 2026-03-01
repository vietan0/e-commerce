-- AlterTable
ALTER TABLE "session" ALTER COLUMN "expired_at" SET DEFAULT NOW() + INTERVAL '30 days'::interval,
ALTER COLUMN "expired_at" SET DATA TYPE TIMESTAMPTZ(6);
