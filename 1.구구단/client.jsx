const React = require('react');
const ReactDom = require('react-dom/client');

const GuGuDan = require('./GuGuDan');

// 18버전 이상에서는 아래와 같이 작성한다.
const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<GuGuDan />);