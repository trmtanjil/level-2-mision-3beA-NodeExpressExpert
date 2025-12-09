import express, { Request, Response } from "express";
import {Pool}from "pg"
const app = express();
const port = 5000;

const pool = new Pool({
    connectionString:` postgresql://neondb_owner:npg_ly4T9HrAFnjo@ep-shiny-thunder-ah7yi6j6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
})

//parser
app.use(express.json());
// app.use(express.urlencoded());

app.get('/', (req:Request, res:Response) => {
  res.send('Hello tanjil you are next level developer!')
})

app.post("/", (req:Request, res:Response)=>{

    console.log(req.body)

    res.status(201).json({
        succes:true,
        message:"API is working",
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
