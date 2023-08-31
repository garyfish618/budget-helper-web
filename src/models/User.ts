import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma"

export default class User {
    email: string
    password: string
    
    constructor(email: string, password: string) {
        this.email = email
        this.password = password
    }


    static async createUser(user: User) {
        try {
            const createdUser = await prisma.user.create({
                data: {
                    email: user.email,
                    password: user.password
                }
            })

            return createdUser
        } catch(error: any) {
            throw new Error(`Failed to create a user. ${error.message}`)
        }

    }
}