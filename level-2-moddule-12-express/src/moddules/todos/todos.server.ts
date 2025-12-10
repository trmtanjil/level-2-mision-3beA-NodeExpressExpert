import { pool } from "../../config/db"


const creatTodos= async(user_id:string,title:string)=>{
   const result = await pool.query(`INSERT INTO todos (user_id, title) VALUES ($1 , $2) RETURNING *`,[user_id,title])
   return result;
}

const getTodos=async()=>{
    const result = await pool.query(`SELECT * FROM todos `)
    return result;
}

const updateTodos = async(title:string,completed:boolean,id:string)=>{
  const result=  await pool.query(
            `UPDATE todos 
             SET title = $1, completed = $2, updated_at = NOW()
             WHERE id = $3
             RETURNING *`,
            [title, completed,id]
        );
        return result
}


export const todosServices={
   creatTodos,
   getTodos ,
   updateTodos,
}