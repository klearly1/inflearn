const React = require('react');
const { useState, useRef } = React;

class GuGuDan extends React.Component {
    state = {
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        result: '정답을 입력하세요',
        value: '',
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (parseInt(this.state.value) === this.state.first * this.state.second) {
            this.setState((prevState) => {
                return {
                    first: Math.ceil(Math.random() * 9),
                    second: Math.ceil(Math.random() * 9),
                    result: '정답 : ' + prevState.value,
                    value: '',
                }
            });
            this.hello.focus();
        } else {
            this.setState({
                result: '땡',
                value: '',
            });
            this.hello.focus();
        }

    };
    onChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }
    hello;

    render() {
        console.log('렌더링');
        return (
            <div>
                <div>{this.state.first}곱하기{this.state.second}는?</div>
                <form onSubmit={this.onSubmit}>
                    <input ref={(c) => { this.hello = c; }} type="number" value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </div>
        );
    }
}

module.exports = GuGuDan;