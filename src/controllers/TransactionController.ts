import {Request, Response} from 'express'
import { Transaction } from "../models/Transaction"
import {User as PrismaUser} from "@prisma/client"
import { Prisma } from '@prisma/client'
import BudgetMonthCategory from '../models/BudgetMonthCategory'

export class TransactionController { 

    async createTransaction(req: Request, res: Response, next: Function) {
        const { description, amount, date, transactionType, budgetCategoryId } = req.body
        const { id: userId } = await req.user as PrismaUser
        try {
            if (await BudgetMonthCategory.getUserIdFromBudgetMonthCategory(budgetCategoryId) != userId) {
                return res.status(401).send("Unauthorized")
            }
            
            const transactionId = await Transaction.createTransaction(new Transaction(description, amount, date, transactionType, budgetCategoryId ))
            return res.status(201).json({id: transactionId, description, amount, date, transactionType, budgetCategoryId})
        } catch(error: any) {
            next(error)
        }
    }

    async updateTransaction(req: Request, res: Response, next: Function) {
        const id = parseInt(req.params.id)
        const { id: userId } = await req.user as PrismaUser
        const { updates } = req.body

        try {
            let data:any = {}
            for (let update of updates) {
                data[update.field] = update.value
            }

            if (await Transaction.getUserIdFromTransaction(id) != userId) {
                return res.status(401).send("Unauthorized")
            }

            const transaction = await Transaction.updateTransaction(id, data)
            return res.status(200).json(transaction)

        } catch(error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(409).json({message: "Updates violate unique constraint"})
                }

                return res.status(404).json({message: "Transaction not found"})
            }
            
            next(error)
        }


    }
} 