import React, { memo } from "react";


const Ball = memo(({ number }) => { //pureComponent로 적용시켜주고 싶으면 memo로 감싸주기

    let background;

    if (number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }
    return (
        <div className="ball" style={{ background }}>{number}</div>
    );

});




// class Ball extends pureComponent {

// }

export default Ball;