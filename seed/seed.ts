import { PrismaClient } from '@prisma/client'
import { users } from "./data"

const prisma = new PrismaClient()

async function main() {

    for (const user of users) {
        try {
            await prisma.user.create({
                data: {     
                    ...user               
                }
            })
        }

        catch(e: any) {
            console.log(`Could not create user. User most likely already exists`)
            continue
        }
    }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
})