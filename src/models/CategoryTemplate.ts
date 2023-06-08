import prisma from "../../lib/prisma";
import ResourceNotFound from "../exceptions/ResourceNotFound";

interface TemplateObject {
    id: number,
    name: string
    amountBudgeted: string
}

export default class CategoryTemplate {
    id: number
    name: string
    amountBudgeted: string

    constructor(template: TemplateObject) {
        this.id = template.id
        this.name = template.name
        this.amountBudgeted = template.amountBudgeted

    }

    static async getCategoryTemplate(templateId: number): Promise<CategoryTemplate>  {
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

    static async getManyCategoryTemplates(templateIds: number[]): Promise<CategoryTemplate[]> {
        try {
            const records = await prisma.categoryTemplate.findMany({
                where: {
                    id: { in: templateIds}
                }
            })
            
            let templates: CategoryTemplate[] = []
            for (let record of records) {
                templates.push(new CategoryTemplate(record))

            }

            return templates

        } catch(error: any) {
            if (error instanceof ResourceNotFound) {
                throw error
            }

            throw new Error(`Failed to fetch category template IDs. ${error.message}`)
        }
    }
}