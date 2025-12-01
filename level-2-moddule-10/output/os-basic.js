const os = require("os")

console.log('system info \n');
console.log('-'.repeat(50));
console.log('platform details:');
console.log('platform', os.platform())
console.log('árchitecture',os.arch())
console.log('os type', os.type())
console.log('os release:', os.release())
console.log('hostname:', os.hostname())

console.log('-'.repeat(50));

console.log('\nCPU info:')
const cpus = os.cpus();
console.log('CPU Model:',cpus[0].model)
console.log('number of cores :', cpus.length)
console.log('cpu Speed:', cpus[0].speed)

console.log('-'.repeat(50));

const totalMem = os.totalmem();
const freeMem = os.freemem();
console.log('total memoy :', (totalMem/1024/1024/1024).toFixed(2),'Gb')

console.log('free memoy :', (freeMem/1024/1024/1024).toFixed(2),'Gb')

console.log('-'.repeat(50));

const uptime =os.uptime();
const days = Math.floor(uptime/86400)
const hours = Math.floor((uptime%86400)/3600)
const minutes = Math.floor((uptime%3600)/60)
console.log(`${uptime}days ${hours}hours${minutes} minutes`)