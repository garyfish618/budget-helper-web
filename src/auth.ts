import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JWTStrategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import env from 'dotenv'

env.config()

passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_KEY
    },
    async (jwtPayload, done) => {
        try {
            const user = User.findUnique({where: {id: jwtPayload.id}})

            if (!user) {
                return done(null, false, {message: 'Invalid user'})
            }

            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))

passport.use(new LocalStrategy(

    (email:String, password:string, done:Function) => {
        User.findUnique({
            where: {
                email
            }
        }),
        async (err: Error, user: User) => {
            if (err) { return done(err)}
            if (!user) {return done(null, false, {message: 'Invalid credentials'})}
            
            return await authenticateUser(user, password)
        } 


    }
))

const authenticateUser = async (user: User, password: string) => {
    try {
        return await bcrypt.compare(password, user.password)
    } catch (error){
        throw error

    }

}

