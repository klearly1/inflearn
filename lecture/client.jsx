import TicTacToe from "./TicTacToe";

const React = require('react');
const ReactDom = require('react-dom/client');
// const ReactDom = require('react-dom');
// const ResponseCheck = require('./ResponseCheck');

// 18버전 이상에서는 아래와 같이 작성한다.
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<TicTacToe />);


// 17버전 이하 버전
// ReactDom.render(<WordRelay />, document.querySelector('#root'));