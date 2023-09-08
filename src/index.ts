import express, { Application, NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import swaggerUi from "swagger-ui-express"
import YAML from "yamljs"
import passport from 'passport'
import { Strategy as JWTStrategy } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import User from "./models/User"
import bcrypt from 'bcrypt'
import { ExtractJwt } from 'passport-jwt'
import env from 'dotenv'

export const app: Application = express()

const swaggerDocument = YAML.load("./swagger.yaml")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }))
app.use(passport.initialize())

env.config()

passport.use(new JWTStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_KEY
    },
    async (jwtPayload, done) => {
        try {
            const user = User.getUser(jwtPayload.email)

            if (!user) {
                return done(null, false)
            }

            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }
))

passport.use(new LocalStrategy({usernameField: 'email'}, async (email:string, password:string, done:Function) => { 
    const user = await User.getUser(email)
    if (!user) {return done(null, false)}
    authenticateUser(user, password)
        .then((result) => {
            if (result) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
}
))

const authenticateUser = async (user: User, password: string) => {
    try {
        return await bcrypt.compare(password, user.password)
    } catch (error){
        throw error

    }

}

export default passport
import routes from './routes/routes'
app.use(routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        res.status(400).send({ error: "Invalid JSON" })
    }
    
    console.error(err)
    res.status(500).send('Unexpected server error');
});

app.get("/", (req: Request, res: Response) => {
    res.send("Healthy")
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)

})

