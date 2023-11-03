import CategoryTemplate from "./CategoryTemplate";

export default class BudgetMonthCategory {
    // static async createManyBudgetMonthCategories(templates: CategoryTemplate[], budgetMonthId: number) {
        

    // }

    static async getUserIdFromBudgetMonthCategory(id: number) {
        const budgetMonthCategory = await prisma?.budgetMonthCategory.findUnique({
            where: {
                id
            }, 
            include: {
                budgetMonth: true
            }
        })

        return budgetMonthCategory?.budgetMonth.userId

    }

}