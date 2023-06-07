import {Request, Response} from 'express';
import BudgetMonth from '../models/BudgetMonth'
import prisma from "../../lib/prisma";
import { ResourceNotFound } from "@tsed/common";

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
        } catch (error) {
            console.log(error instanceof Error)
            if (error instanceof ResourceNotFound) {
                return res.status(404).json({})
            }
 
            next(error)
        }
    }
}