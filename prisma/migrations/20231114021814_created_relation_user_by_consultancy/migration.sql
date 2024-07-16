/*
  Warnings:

  - Added the required column `consultancyId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'DOCTOR';

-- DropForeignKey
ALTER TABLE "check_in" DROP CONSTRAINT "check_in_user_id_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "consultancyId" TEXT NOT NULL,
ADD COLUMN     "photoPath" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_consultancyId_fkey" FOREIGN KEY ("consultancyId") REFERENCES "consultacy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
