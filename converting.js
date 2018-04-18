const fs = require('fs');
const iconv = require('iconv-lite');

const buf = fs.readFileSync('./resources/euckr.txt');

const utf8 = buf.toString();
console.log('UTF8:', utf8);

const euckr = iconv.decode(buf, 'euckr');
console.log('EUCKR:', euckr);

// 쓸 때
console.log('----------------------------');

const data = iconv.encode('가나다', 'euckr');
console.log(data);

fs.writeFileSync('_euckr.txt', data, {
    encoding: null
});

console.log(iconv.decode(fs.readFileSync('_euckr.txt'), 'euckr'));