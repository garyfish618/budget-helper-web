import { body, param, validationResult } from "express-validator"
import prisma from "../../lib/prisma";
import { Request, Response, NextFunction } from 'express';

const validateValidBudgetMonthId = [
    param('id').exists().isInt({ min: -2147483648, max: 2147483647 }).withMessage("ID is a required field"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        return next()
    }
]

const validateNewBudgetMonth = [ 
    body('month').custom(isValidMonth),
    body('year').custom(isValidYear),
    body('categoryTemplateIds').isArray().withMessage("categoryTemplateIds must be an array").custom(isValidCategoryTemplate),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        return next()
    }
]

const validateNonExistingBudgetMonth = [
    body('month').custom((value, { req }) => isUniqueInBudgetMonthTable(value, req)),
    (req: Request, res: Response, next:NextFunction) => {
        const erorrs = validationResult(req)
        if (!erorrs.isEmpty()) {
            return res.status(409).json({errors: erorrs.array()})
        }
        return next()
    }
]

const validateUpdateBudgetMonth = [
    body('updates').isArray().withMessage("updates must be an array of updates").custom(isValidUpdatesArray),
    (req: Request, res: Response, next:NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        return next()
    }
]

function isValidUpdatesArray(value: any[]) {
    for (let obj of value) {
        const keys = Object.keys(obj)
        if(!(keys.length === 2 && keys.includes("field") && keys.includes("value"))) {
            throw new Error(`Updates array is malformed`)
        }
    }

    return true
}

async function isUniqueInBudgetMonthTable(value:string, req:any ) {
    const month = parseInt(value)
    const year = parseInt(req.body.year)

    const budgetMonth = await prisma.budgetMonth.findUnique({where: {
        monthYear: {
            month: month,
            year: year

        }
    }}) 

    if (budgetMonth) {
        throw new Error(`Budget with month ${month} and year ${year} already exists`)
    }

    return true
}

async function isValidCategoryTemplate(value:Array<Number>) {
    for(let templateId of value) {
        if (typeof templateId !== 'number') {
            throw new Error(`CategoryTemplateId ${templateId} is not a valid ID`)
        }

        if ( ! await prisma.categoryTemplate.findUnique({where: {id: templateId}}) ) {
            throw new Error(`CategoryTemplate with template ID ${templateId} not found`)
        }
    }

    return true
}

function isValidMonth(value:number) {
    let month:number = value
    if (!month) {
        throw new Error("A month is required")
    }

    if (month < 1 || month > 12) {
        throw new Error(`Month ${month} is not a valid month number`)
    }

    return true
}

function isValidYear(value:number) {
    let year:number = value
    if (!year) {
        throw new Error("A year is required")

    }
    if (year < 1900 || year >  9999) {
        throw new Error(`Year ${year} is not a valid year`)
    }

    return true
}

export { 
    validateValidBudgetMonthId,
    validateNewBudgetMonth,
    validateNonExistingBudgetMonth,
    validateUpdateBudgetMonth 
};