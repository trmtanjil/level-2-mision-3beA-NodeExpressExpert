import { readUser } from "../helpers/fileDb";
import parseBody from "../helpers/parseBody";
import addRoutes from "../helpers/routhandler";
import sendJson from "../helpers/sendJson";

addRoutes("GET", "/",(req,res)=>{
    sendJson(res,200,{
        message:'Hello from node js with typescript...',
        path:req.url,
    });
})

addRoutes("GET","/api",(req,res)=>{
    sendJson(res,200,{
        message:"healt strus ok",
        path:req.url,
    })
})

addRoutes("POST",'/api/user',async(req,res)=>{
    const body =await parseBody(req);

    //userjson read
    const users= readUser()

    const newUser= {
        id:Date.now(),
        ...body,
    }
    users.Push(newUser)
    sendJson(res,201,{succes:true,data:body})
})