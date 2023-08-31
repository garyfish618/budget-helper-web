import prisma from "../../lib/prisma";
import ResourceNotFound from "../exceptions/ResourceNotFound";
import { CategoryTemplate as PrismaCategoryTemplate } from "@prisma/client";

interface TemplateObject {
    id: number,
    name: string
    amountBudgeted: string
}

export class CategoryTemplate {
    name: string
    amountBudgeted: string

    constructor(name: string, amountBudgeted: string) {
        this.name = name
        this.amountBudgeted = amountBudgeted

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

    static async getAllCategoryTemplates(): Promise<PrismaCategoryTemplate[]> {
        try {
            const records = await prisma.categoryTemplate.findMany()
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
                    userId: 1,
                    name: categoryTemplate.name,
                    amountBudgeted: categoryTemplate.amountBudgeted

                }
            })

            return createdTemplate.id

        } catch (error: any) {
            throw new Error(`Failed to create a category template. ${error.message}`)

        }
    } 
}