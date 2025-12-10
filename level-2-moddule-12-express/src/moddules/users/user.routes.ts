import express, { Request, Response } from "express"
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";

const router =express.Router();

router.post("/",userControllers.creatUser)

router.get('/',async(req:Request, res:Response)=>{
 const result = await pool.query(`SELECT * FROM users `)
 try{
    res.status(200).json({
        success:true,
        message:'users get succesfully',
        data:result.rows
    })
 }catch(err:any){
    res.status(500).json({
        success:false,
         message:err.message,
    })
 }
 })


 router.get('/:id',async(req:Request, res:Response)=>{
    // console.log(req.params.id)
    try{
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`,[req.params.id])

        if(result.rows.length ===0){
            res.status(404).json({
                success:false,
                message:'user not found'
            }) 
        }else{
            res.status(200).json({
                success:true,
                message:'user fetched successfully',
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

export const userRouter = router
