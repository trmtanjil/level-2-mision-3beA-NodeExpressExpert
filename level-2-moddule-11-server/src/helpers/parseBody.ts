import { rejects } from "assert";
import { promises } from "dns";
import { IncomingMessage } from "http";
import { resolve } from "path";

async function parseBody(req:IncomingMessage):Promise<any> {
    return new Promise((resolve,reject)=>{
        let body = '';
        req.on('data',(chunk)=>{
            body +=chunk.toString();
        });
        req.on('end',()=>{
            try{
                resolve(body? JSON.parse(body):{});
            }
            catch(err:any){
                reject(err)
            }
        });
        req.on('error',reject)
    })
}
export default parseBody;