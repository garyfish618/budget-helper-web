import prisma from "../../lib/prisma";
import express from 'express';
import { BudgetMonthController } from '../controllers/BudgetMonthController';

const router = express.Router()

const budgetMonthController = new BudgetMonthController();

router.get("/budget-months", budgetMonthController.getAllBudgetMonths);
router.get("/budget-months/:id", )

// router.get("/budget-months", async (req, res, next) => {
//     try {
//         const budgetId:string | undefined = req.query['budgetId'] ? String(req.query['budgetId']) : undefined
//         if (budgetId !== undefined) {
            
//             const record = await prisma.budgetMonth.findUnique({
//                 where: {
//                     id: parseInt(budgetId)
//                 }    
//             })
    
//             if (!record) {
//                 return res.status(404).send() 
//             }

//             return res.status(200).json(record)
//         }
    
//         const allMonths = await prisma.budgetMonth.findMany()
//         res.status(200).json(allMonths)
//     } catch (error){
//         next(error)
//     }
// });

export default router;
