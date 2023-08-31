import { body, param, validationResult } from "express-validator"
import { Request, Response, NextFunction } from 'express';

const validateNewCategoryTemplate = [
    body('name').exists().withMessage("Name must be present"),
    body('amountBudgeted').exists().withMessage("Amount budgeted must be present")
    .custom(isValidMoney).withMessage("Amount must be a valid amount of money"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        return next()
    }
]

const validateNonExistingCategoryTemplate = [
    body('name').custom((value, { req }) => isUniqueInCategoryTemplateTable(value)),
    (req: Request, res: Response, next:NextFunction) => {
        const erorrs = validationResult(req)
        if (!erorrs.isEmpty()) {
            return res.status(409).json({errors: erorrs.array()})
        }
        return next()
    }
]

async function isUniqueInCategoryTemplateTable(value:string) {

    const categoryTemplate = await prisma?.categoryTemplate.findUnique({where: {name: value}})

    if (categoryTemplate) {
        throw new Error(`Category template with name ${value} already exists`)
    }

    return true
}


function isValidMoney(value:string) {
    const moneyRegex = /^\d+(\.\d{1,2})?$/;
    return moneyRegex.test(value);
}

export {
    validateNewCategoryTemplate,
    validateNonExistingCategoryTemplate
}