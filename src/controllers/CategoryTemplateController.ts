import {Request, Response} from 'express'
import ResourceNotFound from '../exceptions/ResourceNotFound'
import { CategoryTemplate } from '../models/CategoryTemplate'
import {User as PrismaUser} from "@prisma/client"
import { Prisma } from '@prisma/client'

export class CategoryTemplateController {
    async getAllCategoryTemplates(req: Request, res: Response, next: Function) {
        try {
            const { id } = await req.user as PrismaUser
            return res.status(200).json(await CategoryTemplate.getAllCategoryTemplates(id))

        } catch (error) {
            next(error)
        }
    }

    async createCategoryTemplate(req: Request, res: Response, next: Function) {
        const { name, amountBudgeted } = req.body
        try {
            const { id } = await req.user as PrismaUser
            const categoryTemplateId = await CategoryTemplate.createCategoryTemplate(new CategoryTemplate(name, amountBudgeted, id))
            return res.status(201).json({id: categoryTemplateId, name, amountBudgeted})
        } catch(error: any) {
            next(error)
        }
    }

    async updateCategoryTemplate(req: Request, res: Response, next: Function) {
        const id  = parseInt(req.params.id) 
        const { id: userId} = await req.user as PrismaUser
        const { updates } = req.body
        

        try {
            let data:any = {}
            for (let update of updates) {
                data[update.field] = update.value
            }
            let categoryTemplate = await CategoryTemplate.getCategoryTemplate(id)

            if (categoryTemplate.userId != userId) {
                return res.status(401).send("Unauthorized")
            }

            categoryTemplate = await CategoryTemplate.updateCategoryTemplate(id, data)

            return res.status(200).json(categoryTemplate)
        } catch(error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {

                if (error.code === 'P2002') {
                    return res.status(409).json({message: "Updates violate unique constraint"})
                }

                return res.status(404).json({message: "CategoryTemplate not found"})
            }
            
            next(error)
        }

    }

}