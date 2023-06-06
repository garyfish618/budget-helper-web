import prisma from "../../lib/prisma";

export default class BudgetMonth {
    static async getBudgetMonth(budgetId: number): Promise<BudgetMonth | null>  {
        try{
            const record = await prisma.budgetMonth.findUnique({
                where: {
                    id: budgetId
                }    
            })
    
            return record
        } catch(error: any) {
            throw new Error(`Failed to fetch Budget Month Record with ID ${budgetId}. ${error.message}`)
        }
    }

    static async  getAllBudgetMonths(): Promise<BudgetMonth[] | null>  {
        try{
            const allBudgetMonths = await prisma.budgetMonth.findMany()  
            return allBudgetMonths
        } catch(error: any) {
            throw new Error(`Failed to fetch all Budget Month Records. ${error.message}`)
        }
    }
}