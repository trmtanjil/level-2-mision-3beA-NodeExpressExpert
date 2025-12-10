import express, { NextFunction, request, Request, Response } from "express";
import {Pool, Result}from "pg"

import { userInfo } from "os";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./midleware/loger";
import { userRouter } from "./moddules/users/user.routes";


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
// get user



// app.get("/users/:id", async(req:Request, res:Response)=>{
//     // console.log(req.params.id)
//     try{
//         const result = await pool.query(`SELECT * FROM users WHERE id = $1`,[req.params.id])

//         if(result.rows.length ===0){
//             res.status(404).json({
//                 success:false,
//                 message:'user not found'
//             }) 
//         }else{
//             res.status(200).json({
//                 success:true,
//                 message:'user fetched successfully',
//                 data:result.rows[0]
//             })
//         }
//     }catch(err:any){
//         res.status(500).json({
//             success:false,
//             message:err.message,
//         })
//     }
// })


//updater user
app.put("/users/:id", async(req:Request, res:Response)=>{
    // console.log(req.params.id)
    const {name, email}= req.body;
    try{
        const result = await pool.query(`UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,[name, email, req.params.id])

        if(result.rows.length ===0){
            res.status(404).json({
                success:false,
                message:'user not found'
            }) 
        }else{
            res.status(200).json({
                success:true,
                message:'user updated successfully',
                data:result.rows[0]
            })
        }
    }catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message,
        })
    }
})
//delet user method
app.delete("/users/:id", async(req:Request, res:Response)=>{
    // console.log(req.params.id)
 
    try{
        const result = await pool.query(`DELETE FROM users WHERE id = $1`,[ req.params.id])

        if(result.rowCount ==0){
            res.status(404).json({
                success:false,
                message:'user not found'
            }) 
        }else{
            res.status(200).json({
                success:true,
                message:'user delete successfully',
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

//todos operation

app.post('/todos',async(req:Request, res:Response)=>{
    const {user_id, title}=req.body;
    try{
        const result = await pool.query(`INSERT INTO todos (user_id, title) VALUES ($1 , $2) RETURNING *`,[user_id,title])
        res.status(200).json({
            success:true,
            message:'todos post successfully',
            data:result.rows[0]
        })
    }catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
            
        })
    }

})

app.get('/todos',async(req:Request, res:Response)=>{
 const result = await pool.query(`SELECT * FROM todos `)
 try{
    res.status(200).json({
        success:true,
        message:'todos get succesfully',
        data:result.rows
    })
 }catch(err:any){
    res.status(500).json({
        success:false,
         message:err.message,
    })
 }
 })


//updater todos
app.put("/todos/:id", logger, async(req:Request, res:Response) => {
    const { title, completed } = req.body;

    try {
        const result = await pool.query(
            `UPDATE todos 
             SET title = $1, completed = $2, updated_at = NOW()
             WHERE id = $3
             RETURNING *`,
            [title, completed, req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'todo not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'todo updated successfully',
            data: result.rows[0]
        });

    } catch (err:any) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
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
