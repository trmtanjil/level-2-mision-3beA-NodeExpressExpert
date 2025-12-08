"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = __importDefault(require("./config"));
const routhandler_1 = require("./helpers/routhandler");
require("./routes");
const server = http_1.default.createServer((req, res) => {
    console.log('server is running....');
    const method = req.method?.toUpperCase() || '';
    const path = req.url || "";
    const methodMap = routhandler_1.routes.get(method);
    const handler = methodMap?.get(path);
    if (handler) {
        handler(req, res);
    }
    else {
        res.writeHead(404, { 'contect-type': 'application/json' });
        res.end(JSON.stringify({
            success: false,
            message: 'Route not found!!!',
            path,
        }));
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
});
server.listen(config_1.default.port, () => {
    console.log(`server running on port ${config_1.default.port}`);
});
