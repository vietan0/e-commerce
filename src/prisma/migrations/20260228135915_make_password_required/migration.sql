/*
  Warnings:

  - Made the column `password` on table `app_user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "app_user" ALTER COLUMN "password" SET NOT NULL;
