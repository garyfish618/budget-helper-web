import { PrismaClient } from '@prisma/client'
import { budgetMonths, categoryTemplates } from "./data"

const prisma = new PrismaClient()

async function main() {
  
    for (const budgetMonth of budgetMonths) {
        await prisma.budgetMonth.create({
            data: {     
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