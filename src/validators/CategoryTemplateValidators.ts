import { body, validationResult } from "express-validator"
import { Request, Response, NextFunction } from 'express';
import { isValidMoney } from "./UtilValidators";

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
    body('name').custom((value, { req }) => isUniqueInCategoryTemplateTable(value, req)),
    (req: Request, res: Response, next:NextFunction) => {
        const erorrs = validationResult(req)
        if (!erorrs.isEmpty()) {
            return res.status(409).json({errors: erorrs.array()})
        }
        return next()
    }
]

async function isUniqueInCategoryTemplateTable(value:string, req:any) {
    const { id: userId} = await req.user

    const categoryTemplate = await prisma?.categoryTemplate.findUnique({where: {nameUser: {name: value, userId}}})

    if (categoryTemplate) {
        throw new Error(`Category template with name ${value} already exists`)
    }

    return true
}



export {
    validateNewCategoryTemplate,
    validateNonExistingCategoryTemplate
}