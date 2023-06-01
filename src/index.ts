import express, { Application, Request, Response} from "express";
import bodyParser from "body-parser";
import cors from 'cors'

export const app: Application = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "<http://localhost:3000>" }))

app.get("/", (req: Request, res: Response) => {
    res.send("Healthy")

})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)

})

