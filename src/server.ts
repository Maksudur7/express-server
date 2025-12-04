import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routs";
import { todoRouter } from "./modules/todo/todo.routs";
import { authRoutes } from "./modules/auth/auth.route";

const app = express()
//parser
const port = config.port;
app.use(express.json())
// app.use(express.urlencoded())
// database holo neon 
initDB();
app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello Maksudur')
})
//post users crad
app.use("/users", userRoutes )
app.use("/todos", todoRouter)
app.use("/auth", authRoutes)

// 404 handel kora
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
