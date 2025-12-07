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