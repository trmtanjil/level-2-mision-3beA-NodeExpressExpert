


 import express, { NextFunction, request, Request, Response } from "express";
import {Pool, Result}from "pg"

import { userInfo } from "os";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./midleware/loger";
import { userRouter } from "./moddules/users/user.routes";
import { todosRouter } from "./moddules/todos/todos.routers";
import { authRoutes } from "./moddules/auth/auth.routes";


const app = express();


//parser
app.use(express.json());
 
//initializing db
initDB()



app.get('/',logger, (req:Request, res:Response) => {
  res.send('Hello tanjil you are next level developer!')
})

//users CRUD

app.use('/users',userRouter)
 
 
//todos operation
app.use('/todos',todosRouter)

//auth operation
app.use('/auth',authRoutes)
 



 
// todos delete 


app.use((req:Request, res:Response)=>{
    res.status(404).json({
        success:false,
        message:'route not found',
        path:req.path,
    })
})


export default app;