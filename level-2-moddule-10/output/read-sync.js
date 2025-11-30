const { error } = require("console")
const fs = require("fs")
// console.log(fs)

console.log('start reading')

try{

    const data = fs.readFileSync("../data/diary.txt",'utf8')
    console.log(data)
}
catch(error){
    console.error(error.message)
}
console.log('finished')
