const fs = require("fs")

const cnstent1 ='this is a content \n nodejs is awesome'

try{
    fs.writeFileSync('../output/test-sync.txt',cnstent1);
    console.log('file written sync')
}catch(err){
    console.log(err.messag)
}
 
const content2 = 'this is a cntent too \n asynchronous!!'

fs.writeFile("../output/test-async.txt",content2, (err)=>{
    if(err){
        console.error(err.message)
    }
    else{
        console.log('file written asynchronously')
    }
})