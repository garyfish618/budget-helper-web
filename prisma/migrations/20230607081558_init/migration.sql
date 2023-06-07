-- CreateTable
CREATE TABLE "BudgetMonth" (
    "id" SERIAL NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "extraIncome" TEXT NOT NULL DEFAULT '0',

    CONSTRAINT "BudgetMonth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetMonthCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amountBudgeted" TEXT NOT NULL,
    "budgetMonthId" INTEGER NOT NULL,

    CONSTRAINT "BudgetMonthCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amountBudgeted" TEXT NOT NULL,

    CONSTRAINT "CategoryTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "transactionType" TEXT NOT NULL,
    "budgetMonthCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BudgetMonth_month_year_key" ON "BudgetMonth"("month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTemplate_name_key" ON "CategoryTemplate"("name");

-- AddForeignKey
ALTER TABLE "BudgetMonthCategory" ADD CONSTRAINT "BudgetMonthCategory_budgetMonthId_fkey" FOREIGN KEY ("budgetMonthId") REFERENCES "BudgetMonth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_budgetMonthCategoryId_fkey" FOREIGN KEY ("budgetMonthCategoryId") REFERENCES "BudgetMonthCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
