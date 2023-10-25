/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `consultacy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "consultacy_code_key" ON "consultacy"("code");
