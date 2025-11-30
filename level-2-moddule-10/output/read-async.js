const { error } = require("console")
const fs = require("fs")

console.log('reading start')

fs.readFile('../data/diary.txt','utf-8',(error,data)=>{
    if(error){
        console.error('error happend: ',error.message)
    }
    console.log('file content:')
    console.log(data)
})

console.log('this runds immediately no blocking')