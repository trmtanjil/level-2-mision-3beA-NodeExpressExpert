 
import http, {IncomingMessage, Server, ServerResponse} from 'http';
import path from 'path';
import config from './config';
import addRoutes, { RouteHandler, routes } from './helpers/routhandler';
import "./routes"

function findDynamicRoute(method:string, url:string){
    const methodMap= routes.get(method);
    if(!methodMap) return null;

    for(const [routePath, handler] of methodMap.entries()){
        const routeParts = routePath.split('/');
        const urlPath = url.split('/');

        if(routeParts.length !==urlPath.length) continue;

    
        const params:any ={};
        let matched = true;

        // '/api/users/:id'
        for(let i = 0 ;i<routeParts.length; i ++){
            if(routeParts[i]?.startsWith(':')){
                params[routeParts[i]?.substring(1)!] = urlPath[i]
            }else if(routeParts[i]!==urlPath[i]){
                matched = false;
                break;
            }
        }
        if(matched){
            return {handler, params}
        }
    }
    return null;
};

const server:Server = http.createServer(
   ( req:IncomingMessage, res:ServerResponse)=>{
    console.log('server is running....');

    const method =req.method?.toUpperCase()||'';

    const path = req.url ||"";


    const methodMap = routes.get(method)
    const handler:RouteHandler|undefined = methodMap?.get(path)

    if(handler){
        handler(req,res);
    }
    else if(findDynamicRoute(method, path)){
        const matched = findDynamicRoute(method, path);
        (req as any).params = matched?.params;
    }
    else{
        res.writeHead(404, {'contect-type':'application/json'});
        res.end(
            JSON.stringify({
                success:false,
                message:'Route not found!!!',
                path,
            })
        )
    }




    //root route
    // if(req.url=='/' && req.method =="GET"){
    //     res.writeHead(200, {'content-type':" application/json"});
    //     res.end(
    //         JSON.stringify({
    //             message:"hello from node js with typescript...",
    //             path:req.url,
    //         })
    //     )
    // }

    //health route
    // if(req.url =="/api" && req.method=="GET"){
    //     res.writeHead(200,{'content-type':'application/json'});
    //     res.end(
    //         JSON.stringify({
    //             message:'health status ok',
    //             path:req.url,
    //         })
    //     )
    // }


    // post mathod
    // if(req.url=='/user' && req.method=='POST'){
        // const user ={
        //     id:1,
        //     name:'tanjil',
        // }
        // res.writeHead(200,  {'content-type':'application/json'});
        // res.end(
        //     JSON.stringify(user)
        // )

        // let body = '';

        //listen for data chunk
    //     req.on('data',chunk=>{
    //         body +=chunk.toString();
    //     });
    //     req.on('end',()=>{
    //      try{
    //            const parseBody = JSON.parse(body);
    //         console.log(parseBody)
    //         console.log('tanjil  vai catching chang')
    //         res.end(JSON.stringify(parseBody))
    //      }
    //      catch(err:any){
    //         console.log(err?.message)
    //      }
    //     })
    // }

    // if(req.url=='/api/mod'&& req.method=='POST'){
    //     let body ='';
    //     req.on('data',chunk=>{
    //         body +=chunk.toString();
    //     }) ;
    //     req.on('end',()=>{
    //         try{
    //             const persBody=JSON.parse(body);
    //             console.log(persBody)
    //             console.log('tanjil is running api user')
    //             res.end(JSON.stringify(persBody))
    //         }
    //         catch(err:any){
    //             console.log(err.message)
    //         }
    //     })
    // }
   }
)

server.listen(config.port,()=>{
    console.log(`server running on port ${config.port}`)
})