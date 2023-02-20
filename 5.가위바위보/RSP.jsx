import React, { useState, useRef, useEffect, memo } from 'react';
// import React, { useState, useRef, useEffect, memo } from 'react';
import useInterval from './useInterval';

// 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
// -> setState/props 바뀔때 -> shouldComponentUpdate -> render -> componentDidUpdate
// 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function (v) {
        return v[1] === imgCoord;
    })[0];
}


//                      result, imgCoord, score
//ComponentDidMount
//ComponentDidUpdate
//ComponentWillUnmount

// componentDidMount() {
//     this.setState({
//         imgCoord: 3,
//         score: 1,
//         result: 2,
//     });
// }

// useEffect(() => {
//     setImgCoord();
//     setScore();
// }, [imgCoord, score]);

// useEffect(() => {
//     setResult();
// }, [result]);




const RSP = memo(() => { //배열에는 꼭 useEffect를 다시 실행할 값만 넣기.

    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    const [isRunning, setIsRunning] = useState(true);


    // const interval = useRef();

    // useEffect(() => { //componentDidMount, componentDidUpdate 역할 (1대1대응은 아님)
    //     console.log('다시 실행');
    //     interval.current = setInterval(changeHand, 70);
    //     return () => { //componentWillUnmount
    //         console.log('종료');
    //         clearInterval(interval.current);
    //     }
    // }, [imgCoord]);

    // class의 경우 componentDidMount나 componentDidUpdate에서 모든 state를 조건문으로 분기처리함.

    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    };

    useInterval(changeHand, isRunning ? 100 : null);

    const onClickBtn = (choice) => () => {
        // clearInterval(interval.current);
        if (isRunning) {
            setIsRunning(false);
            const myScore = scores[choice];
            const cpuScore = scores[computerChoice(imgCoord)];
            const diff = myScore - cpuScore;

            if (diff === 0) {
                setResult('비겼습니다');
            } else if ([-1, 2].includes(diff)) {
                setResult('이겼습니다.!');
                setScore((PrevScore) => PrevScore + 1);
            } else {
                setResult('졌습니다.!');
                setScore((PrevScore) => PrevScore - 1);
            }
            setTimeout(() => {
                // interval.current = setInterval(changeHand, 70);
                setIsRunning(true);
            }, 1000);
        }
    };


    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    );
});


export default RSP;
// import React, { Component } from 'react';


// // 클래스의 경우 -> constructor -> render -> ref -> componentDidMount
// // -> setState/props 바뀔때 -> shouldComponentUpdate -> render -> componentDidUpdate
// // 부모가 나를 없앴을 때 -> componentWillUnmount -> 소멸

// const rspCoords = {
//     바위: '0',
//     가위: '-142px',
//     보: '-284px',
// };

// const scores = {
//     가위: 1,
//     바위: 0,
//     보: -1,
// }

// const computerChoice = (imgCoord) => {
//     return Object.entries(rspCoords).find(function (v) {
//         return v[1] === imgCoord;
//     })[0];
// }

// class RSP extends Component {

//     state = {
//         result:'',
//         imgCoord: '0',
//         score:0,
//     }
//     interval;

//     componentDidMount() { //  컴포넌트가 첫 렌더링 된 후 -> 비동기 요청을 많이 한다.
//         // const { imgCoord } = this.state; // 여기다 코드 삽입하면 클로저 문제가 발생한다.
//         this.interval = setInterval(this.changeHand, 70);
//     }

//     componentDidUpdate()  { // 리 렌더링

//     }

       // 필요할 때 setInterval을 쓰고 componentWillUnmount에서 정리만 하면 됩니다.
//     componentWillUnmount() { // 컴포넌트가 제거되기 직전 -> 비동기 요청 정리를 많이 한다.
//         clearInterval(this.interval);
//     }

//     changeHand = () => {
//         const { imgCoord } = this.state;
//         if(imgCoord === rspCoords.바위) {
//             this.setState({
//                 imgCoord: rspCoords.가위,
//             });
//         } else if(imgCoord === rspCoords.가위) {
//             this.setState({
//                 imgCoord: rspCoords.보,
//             });
//         } else if(imgCoord === rspCoords.보) {
//             this.setState({
//                 imgCoord: rspCoords.바위,
//             });
//         }
//     }

//     onClickBtn = (choice) => {
//         const { imgCoord } = this.state;
//         clearInterval(this.interval);

//         const myScore = scores[choice];
//         const cpuScore = scores[computerChoice(imgCoord)];
//         const diff = myScore - cpuScore;

//         if (diff === 0) {
//             this.setState({
//                 result: '비겼습니다',
//             });
//         } else if([-1, 2].includes(diff)) {
//             this.setState((prevState) => {
//                 return {
//                     result: '이겼습니다.!',
//                     score: prevState.score + 1,
//                 };
//             });
//         } else {
//             this.setState((prevState) => {
//                 return {
//                     result: '졌습니다.!',
//                     score: prevState.score - 1,
//                 };
//             });
//         }
//         setTimeout(() => {
//             this.interval = setInterval(this.changeHand, 70);
//         }, 5000);
//     };

//     render() {
//         const { result, score, imgCoord } = this.state;
//         return (
//             <>
//                 <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}} />
//                 <div>
//                     <button id="rock" className="btn" onClick={() => this.onClickBtn('바위')}>바위</button>
//                     <button id="scissor" className="btn" onClick={() => this.onClickBtn('가위')}>가위</button>
//                     <button id="paper" className="btn" onClick={() => this.onClickBtn('보')}>보</button>
//                 </div>
//                 <div>{result}</div>
//                 <div>현재 {score}점</div>
//             </>
//         );
//     };
// };

// export default RSP;