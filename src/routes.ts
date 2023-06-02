import prisma from "../lib/prisma";
import { app } from "./index"

app.get("/budget-months", async (req, res) => {
    const budgetId = req.query.id
    if (budgetId) {
        
        const record = prisma.budgetMonth.findUnique({
            where: {
                id: parseInt(budgetId)
            }    
        })

    }
});
  