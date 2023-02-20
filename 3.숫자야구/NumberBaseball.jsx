import React, { useState } from 'react';
import Try from './Try.jsx';

function getNumbers() { // 숫자 네개를 겹치지 않고 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];

    for (let i=0; i<4; i+=1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = () => {

    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers); // lazy init
    const [tries, setTries] = useState([]);


    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')) {

            setResult('홈런');
            setTries((prevTries) => [...prevTries, { try: value, result: '홈런'}]);
            alert('정답.');
            alert('게임을 다시 시작합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);

        } else { // 만약 틀리면
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9 ) { // 10번 이상 틀렸을 경우

                setResult({result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다`});
                alert('게임을 다시 시작합니다.');
                setValue('');
                setAnswer(getNumbers())
                setTries([]);
            } else { // 10번 이하로 틀렸을때
                for(let i = 0; i< 4; i += 1) {
                    if(answerArray[i] === answer[i]) {
                        strike += 1;
                    } else if(answer.includes(answerArray[i])) {
                        ball += 1;
                    }
                }
                setTries((prevTries) => [...prevTries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}]);
                setValue('');
            }
        }
    }

    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput} />
                {/*<input maxLength={4} defaultValue={value} />*/}
            </form>
            <div>시도 : {tries.length}</div>
            <ul>

                {/*{(() => {*/}
                {/*    const array = [];*/}
                {/*    for (let i = 0; i < tries.length; i++) {*/}
                {/*        array.push(<Try key={`${k+1}차 시도 : `} tryInfo={v}  />);*/}
                {/*    }*/}
                {/*    return array;*/}
                {/*})()}                   */}

                {tries.map((v, k) => {
                    return (
                        <Try key={`${k+1}차 시도 : `} tryInfo={v}  />
                    );
                    // key에 k만 주면 성능최적화에 문제가 된다.
                    // k를 고유한 값으로 정의해주자.
                    // 하지만 요소가 추가되는 배열인 경우 k를 써도 된다(삭제x)

                    // react에서 key를 기준으로 엘리먼트를 추가하거나
                    // 수정 삭제 판단 하기 때문에 배열의 순서가 바뀌면 문제가 생긴다.
                })}
            </ul>
        </>

    );

}

export default NumberBaseball; //import NumberBaseball;

// import React, { Component } from 'react';
// import Try from './Try.jsx';
//
// // function getNumbers() { // 숫자 네개를 겹치지 않고 뽑는 함수
// //     const candidate = [1,2,3,4,5,6,7,8,9];
// //     const array = [];
// //
// //     for (let i=0; i<4; i+=1) {
// //         const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
// //         array.push(chosen);
// //     }
// //     return array;
// // }
//
// class NumberBaseball extends Component {
//
//     getNumbers = () => {
//         const candidate = [1,2,3,4,5,6,7,8,9];
//         const array = [];
//
//         for (let i=0; i<4; i+=1) {
//             const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
//             array.push(chosen);
//         }
//         return array;
//     }
//
//     state = {
//         result: '',
//         value: '',
//         answer: this.getNumbers(), // ex [1,3,5,7]
//         tries: [], // push 쓰면 안된다.
//     }
//
//     onSubmitForm = (e) => {
//         e.preventDefault();
//         const { result, value, tries, answer } = this.state;
//         if(value === answer.join('')) {
//             this.setState({
//                 result: '홈런',
//                 tries: [...tries, { try: value, result: '홈런'}],
//             });
//             alert('정답.');
//             alert('게임을 다시 시작합니다.');
//             this.setState({
//                 value: '',
//                 answer: getNumbers(),
//                 tries: [],
//             });
//         } else { // 만약 틀리면
//             const answerArray = value.split('').map((v) => parseInt(v));
//             let strike = 0;
//             let ball = 0;
//             if (tries.length >= 9 ) { // 10번 이상 틀렸을 경우
//                 this.setState({
//                     result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다`,
//                 });
//                 alert('게임을 다시 시작합니다.');
//                 this.setState({
//                     value: '',
//                     answer: getNumbers(),
//                     tries: [],
//                 });
//             } else { // 10번 이하로 틀렸을때
//                 for(let i = 0; i< 4; i += 1) {
//                     if(answerArray[i] === answer[i]) {
//                         strike += 1;
//                     } else if(answer.includes(answerArray[i])) {
//                         ball += 1;
//                     }
//                 }
//                 this.setState({
//                     tries: [...tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
//                     value: '',
//                 });
//             }
//         }
//     }
//     // onSubmitForm = () => {
//     //
//     // }
//
//     onChangeInput = (e) => {
//         console.log(this.state.answer);
//         this.setState({
//             value: e.target.value,
//         });
//
//     }
//     // fruits = [
//     //     { fruit: '사과', taste: '맛없어' },
//     //     { fruit: '감', taste: '시다' },
//     //     { fruit: '포도', taste: '달다' },
//     //     { fruit: '귤', taste: '떫다' },
//     //     { fruit: '배', taste: '맛있다' },
//     // ];
//
//     render() {
//         const { result, value, tries } = this.state;
//         return (
//             <>
//                 <h1>{result}</h1>
//                 <form onSubmit={this.onSubmitForm}>
//                 <input maxLength={4} value={value} onChange={this.onChangeInput} />
//                 {/*<input maxLength={4} defaultValue={value} />*/}
//             </form>
//                 <div>시도 : {tries.length}</div>
//                 <ul>
//                     {tries.map((v, k) => {
//                         return (
//                            <Try key={`${k+1}차 시도 : `} tryInfo={v}  />
//                         );
//                         // key에 k만 주면 성능최적화에 문제가 된다.
//                         // k를 고유한 값으로 정의해주자.
//                         // 하지만 요소가 추가되는 배열인 경우 k를 써도 된다(삭제x)
//
//                         // react에서 key를 기준으로 엘리먼트를 추가하거나
//                         // 수정 삭제 판단 하기 때문에 배열의 순서가 바뀌면 문제가 생긴다.
//                     })}
//                 </ul>
//             </>
//
//         );
//
//     };
//
// };
//
// export default NumberBaseball; //import NumberBaseball;