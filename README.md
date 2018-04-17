## 캐릭터셋과 인코딩
- 캐릭터셋 (Character Set) = 문자집합 = 활자의 정의
- 인코딩 (Encoding) = 각 활자를 바이트코드와 매핑
- 하지만, 혼용되어 사용되는 경우가 많음
- 참고: http://d2.naver.com/helloworld/19187

## 유니코드
- 유니코드는 각 문자를 특정 코드에 정의해놓은 코드집일 뿐
- 코드 포인트(Code Point): U+0000~U+FFFF, U+10000~U+1FFFF
- 유니코드 인코딩 방식:
    - UCS-2, UCS-4: 코드포인트를 코드화
    - UTF-7, UTF-8, UTF-16, UTF-32: 변환 인코딩 형식
    - UTF-8: ASCII와 호환이 가능해서 가장 많이 사용됨
- 인코딩과 유니코드는 전혀 다른 개념임

## Hex 뷰어로 보기
- ASCII (ISO8859-1) ([Table](https://cs.stanford.edu/~miles/iso8859.html))
- UTF8
- UTF8 with BOM
- UTF16 with Big Endian
- UTF16 with Little Endian
- 한글 ([Table](http://jrgraphix.net/r/Unicode/AC00-D7AF))

## BOM (Byte Order Mark)
- http://blog.wystan.net/2007/08/18/bom-byte-order-mark-problem
- utf8, utf16, utf32는 서로 비슷해서 명확한 인코딩 방법을 파일의 맨 앞에 넣어둠
- hex editor로 보자
    - 서브라임에서는 hex viewer 플러그인
    - 16진수 = 헥사데시멀(hexadecimal) = 헥사 라고도 하고 줄여서 hex
- utf8은 utf8인코딩임을 나타내는 시그니처를 넣어둠 (EF BB BF)
    - utf8의 BOM 캐릭터가 문제될 경우 제거하는 것이 좋음
- 참고로, 1byte = 8bit = 2^8 = 2^(4 * 2)
    - 2진수 1111 1111 은 16진수 FF 로 표현 (1바이트)
    - FF FF = 2바이트
    - 0x5938AA = 3바이트
- 리틀엔디언 / 빅엔디언
    - 빅엔디언 = 큰 단위가 앞에 나옴 (우리가 쓰는 것과 동일)
    - 리틀엔디언 = 작은 단위가 앞에 나옴
    - UTF-16에서 U+1234 캐릭터는,
        - 빅엔디언: FE FF로 시작해서, 본문에 12 34
        - 리틀엔디언: FF FE로 시작해서, 본문에 34 12

## UTF-8 인코딩 방식
- 코드 포인트 구간에 따라 다름
    - U+0000~U+007F -> 1바이트
        - 7비트: 0xxx xxxx 그대로 인코딩
        - A = U+0041 = 0100 0001
            - 0*100 0001* = 41
            - http://jrgraphix.net/r/Unicode/0020-007F
    - U+0080~U+07FF -> 2바이트
        - 11비트: 110x xxxx 10xx xxxx
        - £ = U+00A3 = 0000 0*000 1010 0011*
            - 110*0 0010* 10*10 0011* = C2 A3
            - http://jrgraphix.net/r/Unicode/00A0-00FF
    - U+0800~U+FFFF -> 3바이트
        - 16비트: 1110 xxxx 10xx xxxx 10xx xxxx
        - 가 = U+AC00 = *1010 1100 0000 0000*
            - 1110 *1010* 10*11 0000* 10*00 0000* = EA B0 80
            - http://jrgraphix.net/r/Unicode/AC00-D7AF
    - U+010000~U+01FFFFF -> 4바이트
        - 21비트: 1111 0xxx 10xx xxxx 10xx xxxx 10xx xxxx
        - 😃 = U+1F603 = U+01F603 = 000*0 0001 1111 0110 0000 0011*
            - 1111 0*000* 10*01 1111* 10*01 1000* 10*00 0011* = F0 9F 98 83
            - https://apps.timwhitlock.info/emoji/tables/unicode

## 자바스크립트와 유니코드
* 자바스크립트는
    * 언어 레벨에서는 UCS-2
    * 엔진 레벨에서는 UCS-2 또는 UTF-16
        * UCS-2: 유니코드 코드 포인트를 16비트의 고정 길이로 표현
        * UTF-16: UCS-2의 확장으로 코드 포인트를 1개 또는 2개의 16비트로 표현
    * https://mathiasbynens.be/notes/javascript-encoding
    * http://ohgyun.com/620
* 문자열을 유니코드 코드 포인트로 표기할 수 있음('A' = '\u0041')
* `string.charCodeAt()` -> 유니코드 코드 포인트를 10진수(decimal)로 리턴
    * `number.toString(16)`으로 hex로 변환 가능
* `String.fromCharCode()` 로 유니코드 코드 포인트로 가져올 수 있음
    ```js
    const codeDecimal = parseInt(41, 16);
    const char = String.fromCharCode(codeDecimal);
    console.log(char); //-> 'A'
    ```
* 서로게이트 페어
    * BMP 영역을 벗어나는 캐릭터
    * UTF-16 방식으로, 두 개의 16비트로 한 글자를 표현
* String.fromCodePoint()
    * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint

## Node.js Buffer
* Buffer에 바이너리를 담아둠
* `buffer.toString(encoding)`
    * 바이너리가 인코딩된 상태라고 본다
    * 'utf8'로 디코딩
    * 'hex'로 디코딩
* Buffer.from('가나다')
* https://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end

## 캐릭터셋 전환
* https://github.com/ashtuchkin/iconv-lite 
* 바이너리가 인코딩된 상태
* https://gist.github.com/developer-sdk/a70bbf570d36e119c4853bedcfdd29f3 

## 요청 읽어오기
* http message 스펙
    * ascii로 작성 
    * body는 헤더 아래 뉴 라인 이후 작성
    * body 내용은 헤더 중 entity header 영역으로 판단(content-type, content-length)
    * 요청과 응답 모두 동일 (인코딩 이슈가 있을 때, 보내는 쪽과 받는 쪽 모두에서 발생할 수 있지만 잘 생각해보면 문제 없음)
        * euckr 페이지에서 파라미터를 잘 못 받는 경우 (뉴스 검색)
        * euckr 페이지 응답을 파싱할 때 잘 되지 않는 경우 (뉴스 파싱)
    * 예제를 보면 이해하기 쉬울 듯
    * https://developer.mozilla.org/ko/docs/Web/HTTP/Messages
