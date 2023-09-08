import {User as PrismaUser} from "@prisma/client"
import prisma from "../../lib/prisma"
import ResourceNotFound from "../exceptions/ResourceNotFound";

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

    static async getUser(email: string) {
        try {
            const record:PrismaUser|null = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if (!record) {
                throw ResourceNotFound
            }

            return record
        } catch(error: any) {
            if (error instanceof ResourceNotFound) {
                throw error
            }

            throw new Error(`Failed to fetch user with email ${email}. ${error.message}`)
        }
    }
}