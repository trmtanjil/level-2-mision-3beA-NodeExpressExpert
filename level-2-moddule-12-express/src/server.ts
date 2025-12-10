import express, { NextFunction, request, Request, Response } from "express";
import {Pool, Result}from "pg"

import { userInfo } from "os";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./midleware/loger";
import { userRouter } from "./moddules/users/user.routes";
import { todosRouter } from "./moddules/todos/todos.routers";


const app = express();
const port = config.port;

//parser
app.use(express.json());
// app.use(express.urlencoded());

//initializing db
initDB()



app.get('/',logger, (req:Request, res:Response) => {
  res.send('Hello tanjil you are next level developer!')
})

//users CRUD

app.use('/users',userRouter)
 
 
app.use('/todos',todosRouter)

//todos operation
 



 
// todos delete 
app.delete("/todos/:id", async(req:Request, res:Response)=>{
    // console.log(req.params.id)
 
    try{
        const result = await pool.query(`DELETE FROM todos WHERE id = $1`,[ req.params.id])

        if(result.rowCount ==0){
            res.status(404).json({
                success:false,
                message:'todos not found'
            }) 
        }else{
            res.status(200).json({
                success:true,
                message:'todos delete successfully',
                data:result.rows
            })
        }
    }catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
})

app.use((req:Request, res:Response)=>{
    res.status(404).json({
        success:false,
        message:'route not found',
        path:req.path,
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
