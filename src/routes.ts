import prisma from "../lib/prisma";
import { app } from "./index"

app.get("/budget-months", async (req, res) => {
        throw new Error("Test error")
        const budgetId:string = String(req.query['id'])
        if (budgetId) {
            
            const record = await prisma.budgetMonth.findUnique({
                where: {
                    id: parseInt(budgetId)
                }    
            })

            if (!record) {
                res.status(404).send() 
            }
        }

        const allMonths = await prisma.budgetMonth.findMany()
        res.status(200).json(allMonths)
});
