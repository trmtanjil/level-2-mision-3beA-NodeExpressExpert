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

   const getsingleTodos=async(req:Request, res:Response)=>{
     // console.log(req.params.id)
     try{
         const result = await todosServices.getsingleTodos(req.params.id!)
 
         if(result.rows.length ===0){
             res.status(404).json({
                 success:false,
                 message:'todos not found'
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

const deleteTodos =  async(req:Request, res:Response)=>{
    // console.log(req.params.id)
    const { id } = req.params;
    try{
        const result = await todosServices.deleteTodos(id!)

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
}

export const todosControllers={
    creatTodos,
    getTodos,
    updateTodos,
    getsingleTodos,

    deleteTodos
}