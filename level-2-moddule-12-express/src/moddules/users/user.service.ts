import { pool } from "../../config/db";

const creatUser = async(name:string,email:string)=>{
   const result = await pool.query(`INSERT INTO users(name, email) VALUES($1, $2) RETURNING*`,[name, email]

   );
   return result;
}

export const userServices={
    creatUser
}