import { IncomingHttpHeaders, ServerResponse } from "http";


type RouteHandler = (req:IncomingHttpHeaders, res:ServerResponse)=>void;

const routes : Map<string, Map<string, RouteHandler>>=new Map();

function addRoutes(method: string, path:string,handler:RouteHandler){
    if(!routes.has(method)) routes.set(method, new Map());
    routes.get(method)!.set(path,handler)
}