/*
  Warnings:

  - Added the required column `user_email` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_phone` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "user_email" TEXT NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL,
ADD COLUMN     "user_phone" TEXT NOT NULL;
