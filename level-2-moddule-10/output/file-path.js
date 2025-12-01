const path = require('path')

console.log('Courrent file info : \n' )
console.log('filename :', __filename)
console.log('directory:',__dirname)

console.log('\n '+'-'.repeat(50)+'\n')

const filePath = '/tanjil/documents/nextLevel.pdf';
console.log('analyzing path:' , filePath, '\n')

console.log('directory :', path.dirname(filePath))
console.log('base name:', path.basename(filePath))
console.log('file extecsion :',path.extname(filePath))
console.log('file name: ',path.basename(filePath, path.extname(filePath)) )

console.log('\n '+'-'.repeat(50)+'\n')

const parsed = path.parse(filePath)
console.log('parse path object :',parsed)
 
console.log('formeted path :', path.format(parsed))