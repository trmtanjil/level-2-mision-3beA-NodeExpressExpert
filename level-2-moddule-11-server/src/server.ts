 
import http, {IncomingMessage, Server, ServerResponse} from 'http';
import path from 'path';
import config from './config';

const server:Server = http.createServer(
   ( req:IncomingMessage, res:ServerResponse)=>{
    console.log('server is running....');

    //root route
    if(req.url=='/' && req.method =="GET"){
        res.writeHead(200, {'content-type':" application/json"});
        res.end(
            JSON.stringify({
                message:"hello from node js with typescript...",
                path:req.url,
            })
        )
    }

    //health route
    if(req.url =="/api" && req.method=="GET"){
        res.writeHead(200,{'content-type':'application/json'});
        res.end(
            JSON.stringify({
                message:'health status ok',
                path:req.url,
            })
        )
    }


    // post mathod
    if(req.url=='/user' && req.method=='POST'){
        // const user ={
        //     id:1,
        //     name:'tanjil',
        // }
        // res.writeHead(200,  {'content-type':'application/json'});
        // res.end(
        //     JSON.stringify(user)
        // )

        let body = '';

        //listen for data chunk
        req.on('data',chunk=>{
            body +=chunk.toString();
        });
        req.on('end',()=>{
         try{
               const parseBody = JSON.parse(body);
            console.log(parseBody)
            console.log('tanjil  vai catching chang')
            res.end(JSON.stringify(parseBody))
         }
         catch(err:any){
            console.log(err?.message)
         }
        })



    }
   }
)

server.listen(config.port,()=>{
    console.log(`server running on port ${config.port}`)
})