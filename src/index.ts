import express, { Application, NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import swaggerUi from "swagger-ui-express"
import YAML from "yamljs"
import routes from './routes/routes'

export const app: Application = express()

const swaggerDocument = YAML.load("./swagger.yaml")

app.use(routes)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "<http://localhost:3000>" }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    res.status(500).send('Unexpected server error');
});

app.get("/", (req: Request, res: Response) => {
    res.send("Healthy")

})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)

})
