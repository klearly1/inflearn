require와 import의 주요 차이점.

-   require()는 CommonJS를 사용하는 node.js문이지만 import()는 ES6에서만 사용

-   require()는 파일 (어휘가 아님)에 들어있는 곳에 남아 있으며 import()는 항상 맨 위로 이동

-   require()는 프로그램의 어느 지점에서나 호출 할 수 있지만 import()는 파일의 시작 부분에서만 실행할 수 있다. 
    (그렇지만 import 전용 비동기 문법으로 파일 중간에 모듈 불러오기를 할 수 있다.)

-   하나의 프로그램에서 두 키워드를 동시에 사용할 수 없다

-   일반적으로 import()는 사용자가 필요한 모듈 부분 만 선택하고 로드 할 수 있기 때문에 더 선호된다. 
    또한 require()보다 성능이 우수하며 메모리를 절약한다.
  
------------------------------------------------------------
babel이 import도 require로 바꿔준다


export const hello = 'hello'; // import { hello }
export const bye = 'hello'; // import { hello, bye }

export default hello; // import hello;


npm init
npm i react react-dom
npm i -D webpack webpack-cli
npm i babel-loader @babel/core
npm i -D @babel/preset-env
npm i -D @babel/preset-react

npm i react-refresh @pmmmwh/react-refresh-webpack-plugin -D
npm i -D @babel/plugin-proposal-class-properties
npm i -D @babel/core babel-loader

npx webpack

webpack.config.js가 기본적인 이름이여야 한다.