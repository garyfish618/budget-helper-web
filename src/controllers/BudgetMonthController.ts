import {Request, Response} from 'express';
import BudgetMonth from '../models/BudgetMonth'
import prisma from "../../lib/prisma";

export class BudgetMonthController {
    async getAllBudgetMonths(req: Request, res: Response, next: Function) {
        try {
            return res.status(200).json(await BudgetMonth.getAllBudgetMonths())

        } catch (error) {
            next(error)
        }
    }

    async getBudgetMonth(req: Request, res: Response, next: Function) {
        try {
            const budgetId:string | undefined = req.query['budgetId'] ? String(req.query['budgetId']) : undefined
            if (budgetId !== undefined) {
                
                const record = await prisma.budgetMonth.findUnique({
                    where: {
                        id: parseInt(budgetId)
                    }    
                })
        
                if (!record) {
                    return res.status(404).send() 
                }
    
                return res.status(200).json(record)
            }
        
            const allMonths = await prisma.budgetMonth.findMany()
            res.status(200).json(allMonths)
        } catch (error){
            next(error)
        }
    }
}