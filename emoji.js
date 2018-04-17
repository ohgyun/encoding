const fs = require('fs');

const buf = fs.readFileSync('./resources/utf8-emoji.txt');

const str = buf.toString('utf8');
console.log('str:', str); //-> 😃
console.log('str length:', str.length); //-> 2 자바스크립트는 언어 레벨에서 UCS-2를 사용하기 때문
console.log('byte length:', buf.byteLength); //-> 4

// 배열로 변경해서 배열의 크기를 확인
console.log('fixed:', [...str].length);