import { Request, Response } from "express";
import { todosServices } from "./todos.server";
 

const creatTodos =async(req:Request, res:Response)=>{
    const {user_id, title}=req.body;
    try{
        const result = await todosServices.creatTodos(user_id,title)
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

}



const getTodos=async(req:Request, res:Response)=>{
 const result = await todosServices.getTodos()
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
 }

 const updateTodos= async(req:Request, res:Response) => {
    const { title, completed } = req.body;

    try {
        const result =  await todosServices.updateTodos(title,completed,req.params.id!)

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
}
export const todosControllers={
    creatTodos,
    getTodos,
    updateTodos,
    
}