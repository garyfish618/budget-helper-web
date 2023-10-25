import {Request, Response} from 'express'
import { Transaction } from "../models/Transaction"

export class TransactionController { 

    async createTransaction(req: Request, res: Response, next: Function) {
        const { description, amount, date, transactionType, budgetCategoryId } = req.body
        try {
            const transactionId = await Transaction.createTransaction(new Transaction(description, amount, date, transactionType, budgetCategoryId ))
            return res.status(201).json({id: transactionId})
        } catch(error: any) {
            next(error)
        }
    }
} 