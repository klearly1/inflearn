const React = require('react');
const { useState, useRef } = React;
// const { Component } = React;


const WordRelay = () => {


    const [word, setWord] = useState('손형철');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputEl = useRef(null);



    const onSubmitForm = (e) => {
        e.preventDefault();
        // console.dir(e.target[0]);
        console.log(e.target.children.word.value);
        if (word[word.length - 1] === e.target.children.word.value[0]) {
            setResult('딩동댕');
            setWord(e.target.children.word.value);
            e.target.children.word.value = '';
            inputEl.current.focus();

        } else {
            setResult('땡');
            e.target.children.word.value = '';
            inputEl.current.focus();
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                {/* <label htmlFor="wordInput">글자를 입력하세요.</label> */}
                {/*<input id="wordInput" className="wordInput" ref={inputRef} value={value} onChange={onChangeInput} />*/}
                <input
                    defaultValue="손형철"
                    id="word"
                    ref={inputEl}
                />
                <button>입력</button>
            </form>
            <div>{result}</div>
        </>

    );
};
// class WordRelay extends Component {

//     state = {
//         word: '손형철',
//         value: '',
//         result: '',
//     };

//     onSubmitForm = (e) => {
//         e.preventDefault();
//         if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
//             this.setState({
//                 result: '딩동댕',
//                 word: this.state.value,
//                 value: '',
//             });

//         } else {
//             this.setState({
//                 result: '땡',
//                 word: this.state.word,
//                 value: '',
//             });
//         }
//     };

//     onChangeInput = (e) => {
//         this.setState({ value: e.target.value });
//     };

//     onRefInput = (c) => {
//         this.input = c;
//     };

//     input;

//     render() {
//         return (
//             <>
//                 <div>{this.state.word}</div>
//                 <form onSubmit={this.onSubmitForm}>
//                     <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput} />
//                     <button>입력</button>
//                 </form>
//                 <div>{this.state.result}</div>
//             </>

//         );
//     }
// }


module.exports = WordRelay;
