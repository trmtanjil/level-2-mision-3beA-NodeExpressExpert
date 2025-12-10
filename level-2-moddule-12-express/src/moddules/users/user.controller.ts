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

 export const userControllers={
    creatUser
 }