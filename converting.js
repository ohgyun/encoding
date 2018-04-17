const fs = require('fs');
const iconv = require('iconv-lite');

// const buf = fs.readFileSync('./resources/ut.txt');

// console.log(buf.byteLength);
// console.log('ASCII:', buf.toString('ascii'));
// console.log('HEX:', buf.toString('hex'));
// console.log('UTF8:', buf.toString('utf8'));



// const buf = Buffer.from('가나다 뛣');
// console.log(buf);

const converted = iconv.encode('가나다', 'euckr');
console.log(converted);

fs.writeFileSync('./resources/euckr.txt', converted, {
    encoding: null
});
