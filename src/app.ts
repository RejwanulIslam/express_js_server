import express, { NextFunction, Request, Response } from "express"
import { Pool } from "pg"
import config from "./config"
import initDB, { pool } from "./config/db"
import logger from "./middleware/logger"
import { userRoute } from "./modules/users/user.route"
import { todosRoute } from "./modules/todos/todo.route"
import { authRouter } from "./modules/auth/auth.route"

const app = express()


// middle ware
app.use(express.json())


//  DB
initDB()


app.get('/',logger, (req: Request, res: Response) => {
  res.send('Hello World!')
})

// user CRUD
app.use('/users',userRoute)



// todos CRUD
app.use('/todos',todosRoute)

// auth route
app.use('/auth',authRouter)



app.use((req:Request,res:Response)=>{
  res.status(404).json({
    sucess:false,
    message:"Route not found",
    path:req.path
  })
})

export default app;
