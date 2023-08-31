import { body, param, validationResult } from "express-validator"
import prisma from "../../lib/prisma";
import { Request, Response, NextFunction } from 'express';

const validateNewUser = [
    body('email').exists().withMessage("Email must be present")
    .isEmail().withMessage("Email is not valid"),
    body('password').exists().withMessage("Password must be present"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
    }
]

const validateNonExistingUser = [
    body('email').custom((email) => isUniqueInUserTable(email)),
    (req: Request, res: Response, next:NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(409).json({errors: errors.array()})
        }

        return next()
    }
]

async function isUniqueInUserTable(email:string) {

    const user = await prisma.user.findUnique({where: {email: email}}) 

    if (user) {
        throw new Error(`User with email ${email} already exists`)
    }

    return true
}

export {
    validateNewUser,
    validateNonExistingUser
}