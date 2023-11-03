import prisma from "../../lib/prisma";
import { BudgetMonthCategory, Prisma } from '@prisma/client'
import ResourceNotFound from "../exceptions/ResourceNotFound";
import BudgetMonth from "./BudgetMonth";

export class Transaction {
    id: number|null
    description: string
    amount: string
    date: string
    transactionType: string
    budgetCategoryId: number;


    constructor(description: string, amount: string, date: string, transactionType: string, budgetCategoryId: number, id: number|null =null) {
        this.id = id
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
                    date: new Date(transaction.date),
                    transactionType: transaction.transactionType,
                    budgetMonthCategoryId: transaction.budgetCategoryId

                }
            })

            return createdTransaction.id

        } catch (error: any) {
            throw new Error(`Failed to create a category template. ${error.message}`)

        }
    }

    static async getTransaction(id: number) {
        try {
            const transaction = await prisma.transaction.findUnique({
                where: {id},
                include: {
                    budgetMonthCategory: {
                        include: {
                           budgetMonth: true 
                        }
                    }
                }
            
            })
            
            if (transaction === null) {
                throw new ResourceNotFound(`Transaction with ID ${id} not found`)
            }

            const prismaBudgetMonthCategory = transaction.budgetMonthCategory
            const prismaBudgetMonth = transaction.budgetMonthCategory.budgetMonth

            return new Transaction(
                transaction.description, 
                transaction.amount, 
                transaction.date.toString(), 
                transaction.transactionType, 
                transaction.budgetMonthCategoryId, 
                transaction.id
            )
        } catch(error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error
            }  

            throw new Error(`Failed to fetch transaction with ID ${id}. ${error.message}`)
        }
    }

    static async updateTransaction(transactionId: number, data: object) {
        try {
            const updatedTransaction = await prisma.transaction.update({
                where: { id: transactionId },
                data: data,
            })

            return updatedTransaction
        } catch(error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error
            }  

            throw new Error(`Failed to update transaction with ID ${transactionId}. ${error.message}`)
        }
    }

    static async getUserIdFromTransaction(id: number) {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id
            }, 
            include: {
                budgetMonthCategory: {
                    include: {
                        budgetMonth: true 
                    }
                }
            }
        })

        return transaction?.budgetMonthCategory.budgetMonth.userId
    }

}
