import { body, param, validationResult } from "express-validator"
import { Request, Response, NextFunction } from 'express';

const validateUpdates = [
    body('updates').isArray().withMessage("updates must be an array of updates").custom(isValidUpdatesArray),
    (req: Request, res: Response, next:NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        return next()
    }
]

const validateValidId = [
    param('id').exists().isInt({ min: -2147483648, max: 2147483647 }).withMessage("ID is a required field"),
    (req: Request, res: Response, next: NextFunction) => {
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

function isValidMoney(value:string) {
    const moneyRegex = /^\d+(\.\d{1,2})?$/;
    return moneyRegex.test(value);
}

function isValidDate(value:string) {
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    return dateRegex.test(value)
}

export { 
    isValidMoney,
    isValidDate,
    validateUpdates,
    validateValidId
}