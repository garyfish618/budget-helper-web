import {Request, Response} from 'express'
import ResourceNotFound from '../exceptions/ResourceNotFound'
import { BudgetCategoryTemplate } from '../models/BudgetCategoryTemplate'
import { Prisma } from '@prisma/client'

export class BudgetCategoryTemplateController {
    async getAllCategoryTemplates(req: Request, res: Response, next: Function) {
        try {
            return res.status(200).json(await BudgetCategoryTemplate.getAllCategoryTemplates())

        } catch (error) {
            next(error)
        }
    }
}