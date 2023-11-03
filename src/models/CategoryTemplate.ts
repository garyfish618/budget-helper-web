import prisma from "../../lib/prisma";
import ResourceNotFound from "../exceptions/ResourceNotFound";
import { CategoryTemplate as PrismaCategoryTemplate } from "@prisma/client";
import { Prisma } from '@prisma/client'

export default class CategoryTemplate {
    name: string
    amountBudgeted: string
    userId: number


    constructor(name: string, amountBudgeted: string, userId: number) {
        this.name = name
        this.amountBudgeted = amountBudgeted
        this.userId = userId

    }

    static async getCategoryTemplate(templateId: number): Promise<PrismaCategoryTemplate>  {
        try{
            const record = await prisma.categoryTemplate.findUnique({
                where: {
                    id: templateId
                },
            })

            if (record === null) {
                throw new ResourceNotFound(`Category template with ID ${templateId} not found`)
            }
    
            return record
        } catch(error: any) {
            if (error instanceof ResourceNotFound) {
                throw error
            }

            throw new Error(`Failed to fetch category template with ID ${templateId}. ${error.message}`)
        }
    }

    static async getAllCategoryTemplates(userId: number): Promise<PrismaCategoryTemplate[]> {
        try {
            const records = await prisma.categoryTemplate.findMany({
                where: {
                    userId
                }
            })
            return records
        } catch(error: any) {
            if (error instanceof ResourceNotFound) {
                throw Error
            }

            throw new Error(`Failed to fetch category template IDs. ${error.message}`)
        }
    }

    static async createCategoryTemplate(categoryTemplate: CategoryTemplate) {
        try { 
            const createdTemplate = await prisma.categoryTemplate.create({
                data: {
                    userId: categoryTemplate.userId,
                    name: categoryTemplate.name,
                    amountBudgeted: categoryTemplate.amountBudgeted

                }
            })

            return createdTemplate.id

        } catch (error: any) {
            throw new Error(`Failed to create a category template. ${error.message}`)

        }
    } 

    static async updateCategoryTemplate(categoryTemplateId: number, data: object) {
        try {
            const updatedCategoryTemplate = await prisma.categoryTemplate.update({
                where: { id: categoryTemplateId },
                data: data
            })

            return updatedCategoryTemplate

        } catch(error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw error
            }  

            throw new Error(`Failed to update category template with ID ${categoryTemplateId}. ${error.message}`)
        }
    }
}
