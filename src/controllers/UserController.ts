import {Request, Response} from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'

class UserController {
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

}

export default UserController