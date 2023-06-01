import prisma from "../lib/prisma";
import { app } from "./index"

app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});
  