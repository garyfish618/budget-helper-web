import { Prisma } from '@prisma/client'
import prisma from "../../lib/prisma";
import ResourceNotFound from "../exceptions/ResourceNotFound";

export default class BudgetMonth {
    month: number
    year: number
    userId: number

    constructor(month: number, year: number, userId: number) {
        this.month = month
        this.year = year
        this.userId = userId

    }

    static async getBudgetMonth(budgetId: number): Promise<BudgetMonth | null>  {
        try{
            const record = await prisma.budgetMonth.findUnique({
                where: {
                    id: budgetId
                },
                include: {
                    categories: {
                        include: {
                            transactions: true
                        }
                    }
                }
            })

            if (record === null) {
                throw new ResourceNotFound(`Budget Month with ID ${budgetId} not found`)
            }
    
            return record
        } catch(error: any) {
            if (error instanceof ResourceNotFound) {
                throw error
            }

            throw new Error(`Failed to fetch Budget Month Record with ID ${budgetId}. ${error.message}`)
        }
    }

    static async getAllBudgetMonths(userId: number): Promise<BudgetMonth[] | null>  {
        try {
            const allBudgetMonths = await prisma.budgetMonth.findMany({
                where: {
                    userId
                },
                include: {
                categories: {
                    include: {
                        transactions: true
                    }
                }
            }})  
            return allBudgetMonths
        } catch(error: any) {
            throw new Error(`Failed to fetch all Budget Month Records. ${error.message}`)
        }
    }

    static async createBudgetMonth(budgetMonth: BudgetMonth) {
        try {
            const createdMonth = await prisma.budgetMonth.create({
                data: {
                    userId: budgetMonth.userId,
                    month: budgetMonth.month,
                    year: budgetMonth.year,
                    extraIncome: "0.00"
                }

            })

            return createdMonth.id

        } catch(error: any) {
            throw new Error(`Failed to create a budget month. ${error.message}`)
        }
    }

    static async updateBudgetMonth(budgetMonthId: number, data: object) {
        try {
            const updatedMonth = await prisma.budgetMonth.update({
                where: { id: budgetMonthId },
                data: data,
                include: {
                    categories: {
                        include: {
                            transactions: true
                        }
                    }
                }
            })

            return updatedMonth

        } catch(error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error
            }  

            throw new Error(`Failed to update budget month with ID ${budgetMonthId}. ${error.message}`)
        }

    }
}