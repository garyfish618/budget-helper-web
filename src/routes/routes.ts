import prisma from "../../lib/prisma";
import express from 'express'

const router = express.Router()

router.get("/budget-months", async (req, res, next) => {
    try {
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
    } catch (error){
        next(error)
    }
});

export default router;
