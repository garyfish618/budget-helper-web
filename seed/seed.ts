import { PrismaClient } from '@prisma/client'
import { budgetMonths, categoryTemplates } from "./data"

const prisma = new PrismaClient()

async function main() {
  
    for (const budgetMonth of budgetMonths) {
        // await prisma.budgetMonth.upsert({
        //     where: {
        //         monthYear: {
        //             month: budgetMonth.month,
        //             year: budgetMonth.year
        //         }
        //     }, 
        //     update: {},
        //     create: {
        //         ...budgetMonth

        //     }
            
        // })

        await prisma.budgetMonth.create({
            data: {
                // month: 1,
                // year: 2023,
                // extraIncome: "50.00",
                // categories: {
                //     create: [
                //         {
                //             name: "Food",
                //             amountBudgeted: "50.00"
                //         } ,
                //         {
                //             name: "Test",
                //             amountBudgeted: "32.00"
                //         }   
                //     ]
                        
                // }        
                ...budgetMonth
                    
            }
        })
    }

    // for (const categoryTemplate of categoryTemplates) {
    //     await prisma.categoryTemplate.create({data: categoryTemplate})
    // }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
})