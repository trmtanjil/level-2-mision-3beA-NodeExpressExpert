import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";


const creatUser =async (req:Request, res:Response)=>{
const {name, email}= req.body;
try{
 const result =await userServices.creatUser(name,email)
// console.log(result.rows[0])
res.status(201).json({
    succes:false,
    message:"Data inserted Succesfully",
    data: result.rows[0]
})

 
}catch(err:any){
    res.status(500).json({
        success:false,
        message: err.message
    })
}
 }

 //get user
 const getUser=async(req:Request, res:Response)=>{
  const result = await userServices.getUser()
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
  }


  //get single user
  const getsingleUser=async(req:Request, res:Response)=>{
    // console.log(req.params.id)
    try{
        const result = await userServices.getSingleUser(req.params.id!)

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
}

//user update
const updateUser =  async(req:Request, res:Response)=>{
     // console.log(req.params.id)
     const {name, email}= req.body;
     try{
         const result = await userServices.updateUser(name , email, req.params.id!)
 
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
 }
 // user delete
 const delteUser =async(req:Request, res:Response)=>{
   
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
 }

 export const userControllers={
    creatUser,
    getUser,
    getsingleUser,
    updateUser,
    delteUser
 }