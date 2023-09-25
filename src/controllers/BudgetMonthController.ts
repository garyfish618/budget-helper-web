import {Request, Response} from 'express';
import BudgetMonth from '../models/BudgetMonth'
import ResourceNotFound from '../exceptions/ResourceNotFound';
import {User as PrismaUser} from "@prisma/client"
import { Prisma } from '@prisma/client'

export class BudgetMonthController {
    async getAllBudgetMonths(req: Request, res: Response, next: Function) {
        try {
            const { id } = await req.user as PrismaUser
            return res.status(200).json(await BudgetMonth.getAllBudgetMonths(id))

        } catch (error) {
            next(error)
        }
    }

    async getBudgetMonth(req: Request, res: Response, next: Function) {
        try {
            const { id } = await req.user  as PrismaUser
            const monthId:string = req.params.id 
            if (monthId !== undefined) {
                const month = await BudgetMonth.getBudgetMonth(parseInt(monthId))
                if (month?.userId != id) {
                    console.log("HERE")

                    return res.status(401).send("Unauthorized")
                }

                return res.status(200).json(await BudgetMonth.getBudgetMonth(parseInt(monthId)))
            }
        } catch (error: any) {
            if (error instanceof ResourceNotFound) {
                return res.status(404).json({})
            }
 
            next(error)
        }
    }

    async createBudgetMonth(req: Request, res: Response, next: Function) {
        const { categoryTemplateIds, month, year } = req.body
        try {
            const { id } = await req.user as PrismaUser
            const budgetMonthId = await BudgetMonth.createBudgetMonth(new BudgetMonth(parseInt(month), parseInt(year), id))
            return res.status(201).json({id: budgetMonthId, month, year, categoryTemplateIds})
            
        } catch(error: any) {
            next(error)
        }
    }

    async updateBudgetMonth(req: Request, res: Response, next: Function) {
        const { id } = req.params 
        const { updates } = req.body
        

        try {
            let data:any = {}
            for (let update of updates) {
                data[update.field] = update.value
            }

            const budgetMonth = await BudgetMonth.updateBudgetMonth(parseInt(id), data)
            return res.status(200).json(budgetMonth)
        } catch(error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                return res.status(404).json({message: "Budget month not found"})
            }
            
            next(error)
        }
    }
}