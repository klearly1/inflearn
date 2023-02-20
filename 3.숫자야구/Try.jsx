import React, { PureComponent, memo, useState } from 'react';

const Try = memo(({ tryInfo }) => {
    return (
        <li>
            <div>{tryInfo.try}</div>
            <div>{tryInfo.result}</div>
        </li>
    );
});

export default Try;

// import React, {Component} from 'react';
//
// const Try = ({ tryInfo }) => {
//     return (
//         <li>
//             <div>{tryInfo.try}</div>
//             <div>{tryInfo.result}</div>
//         </li>
//     );
// }

// import React, {PureComponent} from 'react';
//
//
// class Try extends PureComponent {
//     render() {
//         return(
//             <li>
//                 <div>{this.props.tryInfo.try}</div>
//                 <div>{this.props.tryInfo.result}</div>
//             </li>
//         );
//     };
// };
//
//
// export default Try;