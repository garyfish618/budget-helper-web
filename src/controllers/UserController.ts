import {Request, Response} from 'express'
import User from '../models/User'
import {User as PrismaUser} from "@prisma/client"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import env from 'dotenv'

env.config()

export class UserController {
    async createUser(req: Request, res: Response, next: Function) {
        const { email, password } = req.body 
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await User.createUser(new User(email, hashedPassword)) 
            return res.status(201).json({id: user.id, email})

        } catch(error: any) {
            next(error)
        }

    }

    async loginUser(req: Request, res: Response) {
        const { id, email } = req.user as PrismaUser
            
        const secretKey: string | undefined = process.env.JWT_KEY

        if (!secretKey) {
            return res.status(500)
        }

        if (!req.user) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        } 
        const payload = {
            id,
            email
        }

        const token = jwt.sign(payload, secretKey, {expiresIn: '15m'})

        return res.status(200).json({
            ...payload,
            token

        })
    }
}
