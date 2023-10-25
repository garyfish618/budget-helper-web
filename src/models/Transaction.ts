import prisma from "../../lib/prisma";

export class Transaction {
    description: string
    amount: string
    date: string
    transactionType: string
    budgetCategoryId: number;


    constructor(description: string, amount: string, date: string, transactionType: string, budgetCategoryId: number) {
        this.description = description
        this.amount = amount
        this.date = date
        this.transactionType = transactionType
        this.budgetCategoryId = budgetCategoryId
    }

    static async createTransaction(transaction: Transaction) {
        try { 
            const createdTransaction = await prisma.transaction.create({
                data: {
                    description: transaction.description,
                    amount: transaction.amount,
                    date: transaction.date,
                    transactionType: transaction.transactionType,
                    budgetMonthCategoryId: transaction.budgetCategoryId

                }
            })

            return createdTransaction.id

        } catch (error: any) {
            throw new Error(`Failed to create a category template. ${error.message}`)

        }
    } 

}
