/*
  Warnings:

  - A unique constraint covering the columns `[month,year,userId]` on the table `BudgetMonth` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BudgetMonth_month_year_key";

-- CreateIndex
CREATE UNIQUE INDEX "BudgetMonth_month_year_userId_key" ON "BudgetMonth"("month", "year", "userId");
