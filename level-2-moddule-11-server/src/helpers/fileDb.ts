import path from "path";
import fs from 'fs'
const filePath = path.join(process.cwd(),'../data/user.json')

export function readUser(){
    const data =fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data);
}   

export function writeUsers(users:any){
    fs.writeFileSync(filePath, JSON.stringify(users, null , 2))
}