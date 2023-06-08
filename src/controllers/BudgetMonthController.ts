import {Request, Response} from 'express';
import BudgetMonth from '../models/BudgetMonth'
import ResourceNotFound from '../exceptions/ResourceNotFound';

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
            const id:string = req.params.id 
            if (id !== undefined) {
                return res.status(200).json(await BudgetMonth.getBudgetMonth(parseInt(id)))
            }
        } catch (error: any) {
            if (error instanceof ResourceNotFound) {
                return res.status(404).json({})
            }
 
            next(error)
        }
    }

    async createBudgetMonth(req: Request, res: Response, next: Function) {
        console.log("Got here!")
    }
}