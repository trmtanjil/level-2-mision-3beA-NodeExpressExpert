import { ServerResponse } from "http";

function sendJson(res:ServerResponse, statuscode:number,data:any){
    res.writeHead(statuscode,{"content-type":"application/json"});
    res.end(JSON.stringify(data))
}

export default sendJson;