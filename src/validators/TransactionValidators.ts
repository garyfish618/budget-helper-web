import { body, validationResult } from "express-validator"
import { Request, Response, NextFunction } from 'express';
import { isValidDate, isValidMoney } from "./UtilValidators";

const validateNewTransation = [
    body('description').exists().withMessage("Description must be present"),
    body('transactionType').exists().withMessage("Transaction type must be present"),
    body('budgetCategoryId').exists().withMessage("Budget category ID must be present"),
    body('amount').exists().withMessage("Amount must be present")
    .custom(isValidMoney).withMessage("Amount must be a valid amount of money"),
    body('date').exists().withMessage("Date must be present")
    .custom(isValidDate).withMessage("Date must be a valid date of type YYYY-MM-DD"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        return next()
    }

]