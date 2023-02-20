import React, { useState, useRef } from 'react';


const ResponseCheck = () => {

    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);

    const timeout = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);


    const onClickScreen = () => {


        if(state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요');
            timeout.current = setTimeout(() => { //timeout에 담아주기
            setState('now');
            setMessage('지금 클릭하세요!!');
            startTime.current = new Date();
            }, Math.floor(Math.random() * 1000 ) + 2000); // 2~3초 랜덤
        } else if(state === 'ready') { //성급하게 클릭한 경우
            clearTimeout(timeout.current); //timeout 초기화
            setState('waiting');
            setMessage('너무 성급하세요. 초록색이 된 후 클릭해주세요.');
        } else if(state === 'now') {
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요!!');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }

    };
    const onReset = () => {
        setResult([]);
    };
    const renderAverage = () => {
        return result.length === 0
            ? null
            :   <>
                <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>리셋</button>
                </>
    };

    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                <span>{message}</span>
            </div>
            {(() => {
                if(result.length === 0) {
                    return null;
                } else {
                    return <>
                        <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
                        <button onClick={onReset}>리셋</button>
                    </>
                }
            })()}


            {/*{renderAverage()}*/}
            {/*// 삼항연산자*/}
            {/*/!*{this.state.result.length === 0 ? null : <div>평균 시간 : {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>}*!/*/}
            {/*//합계를 구해서 전체 길이로 나눠주면 평균*/}
            {/*//false, undefined, null은 jsx에서 태그 없음을 의미함.*/}
            {/*//리액트를 가독성있게 만드는건 어렵다.*/}
            {/*//클래스를 하면 미리 구조분해를 하자.*/}

        </>
    );
};

export default ResponseCheck;



// import React, { Component } from 'react';
//
// class ResponseCheck extends Component {
//
//     state = {
//         state: 'waiting',
//         message: '클릭해서 시작하세요',
//         result: [],
//     }
//
//     timeout;
//     startTime;
//     endTime;
//
//     onClickScreen = () => {
//         const { state, message, result } = this.state;
//         if(state === 'waiting') {
//             this.setState({
//                 state: 'ready',
//                 message: '초록색이 되면 클릭하세요',
//             });
//             this.timeout = setTimeout(() => { //timeout에 담아주기
//                 this.setState({
//                     state: 'now',
//                     message: '지금 클릭하세요!!',
//                 });
//                 this.startTime = new Date();
//             }, Math.floor(Math.random() * 1000 ) + 2000); // 2~3초 랜덤
//         } else if(state === 'ready') { //성급하게 클릭한 경우
//             clearTimeout(this.timeout); //timeout 초기화
//             this.setState({
//                 state: 'waiting',
//                 message: '너무 성급하세요. 초록색이 된 후 클릭해주세요.'
//             });
//         } else if(state === 'now') {
//             this.endTime = new Date();
//             this.setState((prevState) => {
//                 return {
//                     state: 'waiting',
//                     message: '클릭해서 시작하세요!!',
//                     result: [...prevState.result, this.endTime - this.startTime],
//                 };
//             });
//         }
//     };
//
//     onReset = () => {
//         this.setState({
//             result: [],
//         });
//     };
//
//     renderAverage = () => {
//         const { result } = this.state;
//         return result.length === 0
//             ? null
//             :   <>
//                 <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
//                 <button onClick={this.onReset}>리셋</button>
//                 </>
//     }
//
//     render() {
//         const {state , message} = this.state;
//         return(
//           <>
//               <div id="screen" className={this.state.state} onClick={this.onClickScreen}>
//                   <span>{this.state.message}</span>
//               </div>
//               {this.renderAverage()}
//               {/*// 삼항연산자*/}
//               {/*/!*{this.state.result.length === 0 ? null : <div>평균 시간 : {this.state.result.reduce((a, c) => a + c) / this.state.result.length}ms</div>}*!/*/}
//               {/*//합계를 구해서 전체 길이로 나눠주면 평균*/}
//               {/*//false, undefined, null은 jsx에서 태그 없음을 의미함.*/}
//               {/*//리액트를 가독성있게 만드는건 어렵다.*/}
//               {/*//클래스를 하면 미리 구조분해를 하자.*/}
//
//           </>
//         );
//     };
// };
//
//
// export default ResponseCheck;