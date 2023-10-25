/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `CategoryTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CategoryTemplate_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTemplate_name_userId_key" ON "CategoryTemplate"("name", "userId");
