const args = process.argv;

// process.arg[0] = node path 
// porcess.arg[1] = file path
//process.arg[2]= first actual argument

const name = args[2] || 'guest';
const time = new Date().getHours()

let greeting ;

if(time<12){
    greeting = 'good morning'
}
else if(time<18){
    greeting = 'afternoon'
}
else{
    greeting= 'good evening'
}


console.log(name,`${greeting},${name}`,time)