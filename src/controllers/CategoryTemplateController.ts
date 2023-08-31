import {Request, Response} from 'express'
import ResourceNotFound from '../exceptions/ResourceNotFound'
import { CategoryTemplate } from '../models/CategoryTemplate'
import { Prisma } from '@prisma/client'

export class CategoryTemplateController {
    async getAllCategoryTemplates(req: Request, res: Response, next: Function) {
        try {
            return res.status(200).json(await CategoryTemplate.getAllCategoryTemplates())

        } catch (error) {
            next(error)
        }
    }

    async createCategoryTemplate(req: Request, res: Response, next: Function) {
        const { name, amountBudgeted } = req.body
        try {
            const categoryTemplateId = await CategoryTemplate.createCategoryTemplate(new CategoryTemplate(name, amountBudgeted))
            return res.status(201).json({id: categoryTemplateId, name, amountBudgeted})
        } catch(error: any) {
            next(error)
        }
    }
}