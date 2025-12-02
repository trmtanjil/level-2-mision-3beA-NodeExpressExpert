//password12211
//lsdjfl;aksdjfwoeifru230jfls;eru

const crypto = require('crypto');

console.log('\n MD5 Hash:');
const md5Hash = crypto.createHash('md5').update('password123').digest('hex');

const md5Hash2 = crypto.createHash('md5').update('password123').digest('hex');

console.log('input password')
console.log('MD5 Hashed Password', md5Hash)
console.log('MD5 Hashed Password 2 ', md5Hash2)

const sha256hash = crypto.createHash('sha256').update('password123').digest('hex');
console.log('input password123');
console.log('Sha256 Hashed Password :', sha256hash)

const sha512hash = crypto.createHash('sha512').update('password123').digest('hex');
console.log('input password123');
console.log('Sha 512 Hashed Password :', sha512hash)