-- AlterTable
ALTER TABLE "session" ALTER COLUMN "expired_at" SET DEFAULT now() + '30 days'::interval;
