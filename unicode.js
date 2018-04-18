function printUsingCharCode(char) {
    const codeDecimal = char.charCodeAt(0);
    const codeHex = codeDecimal.toString(16);
    const str = String.fromCharCode(codeDecimal);

    console.log('Using Char Code:');
    console.log(`  ${char} -> codeDecimal ${codeDecimal} -> codeHex ${codeHex} -> unicode \\u{${codeHex}} -> ${str}`);
}

function printUsingCodePoint(char) {
    const codeDecimal = char.codePointAt(0);
    const codeHex = codeDecimal.toString(16);
    const str = String.fromCodePoint(codeDecimal);

    console.log('Using Code Point:');
    console.log(`  ${char} -> codeDecimal ${codeDecimal} -> codeHex ${codeHex} -> unicode \\u{${codeHex}} -> ${str}`);
}

printUsingCharCode('A');
printUsingCharCode('가');
printUsingCharCode('😃'); // U+1F603, UTF-16는 기본 범위 이후를 서로게이트 페어로 처리하기 때문에, charCodeAt()이 첫 캐릭터만 가져옴
printUsingCodePoint('😃'); // ECMAScript 2015부터 code point를 지원함
