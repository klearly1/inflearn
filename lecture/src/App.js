import './App.css';
import { useState, useEffect, useCallback , useDeferredValue, useMemo } from "react";

export default function App() {
    
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    const deferredName = useDeferredValue(name);
    const result = useMemo(() => deferredName + "의 결과", [deferredName]);

    const onChange = useCallback((e) => {
        setName(e.target.value);
    }, []);
    
    useEffect(() => {
    
        const id = setInterval(() => {
            setCount((prev) => prev + 1);
        }, 1000);
        return () => {
            clearInterval(id);
        };

    }, []);


    return (
        <div className="App">
            <div>{count}</div>
            <input value={name} onChange={onChange} />
            {deferredName ? Array(1).fill().map((v, i) => <div key={i}>{result}</div>) : null}
        </div>
    );
};


// import './App.css';
// import { useState, useLayoutEffect, useEffect, useTransition, useCallback, startTransition } from "react";

// export default function App() {
    
//     const [count, setCount] = useState(0);
//     const [name, setName] = useState("");
//     const [result, setResult] = useState("");
//     const [loading, startTransition] = useTransition();

//     const onChange = useCallback((e) => {
//         setName(e.target.value);
//         startTransition(() => {
//             setResult(e.target.value + "의 결과");
//         });
//     }, []);
    


//     useEffect(() => {
    
//         const id = setInterval(() => {
//             setCount((prev) => prev + 1);
//         }, 1000);
//         return () => {
//             clearInterval(id);
//         };

//     }, []);


//     return (
//         <div className="App">
//             <div>{count}</div>
//             {loading ? <div>로딩중</div> : null}
//             <input value={name} onChange={onChange} />
//             {name ? Array(1).fill().map((v, i) => <div key={i}>{result}</div>) : null}
//         </div>
//     );
// };

// export default App;

// import './App.css';
// import { useState, useLayoutEffect, useEffect } from "react";

// const App = () => {
    
//     const [name, setName] = useState("");

//     useLayoutEffect(() => { //react hook flow diagram 참고
//         setName('손형철');
//     }, []);

//     //기본적으로 useEffect를 쓰는데
//     //만약 화면 깜빡임이 발생하면
//     // useLayoutEffect를 통해서 실행 순서를 압당 길 수 있다.

//     // useEffect(() => { //react hook flow diagram 참고
//     //     setName('손형철');
//     // }, []);


//     return (
//         <div>
//             <div>안녕하세요. {name}입니다. 잘부탁드립니다.</div>
//             <div>안녕하세요. {name}입니다. 잘부탁드립니다.</div>
//             <div>안녕하세요. {name}입니다. 잘부탁드립니다.</div>
//             <div>안녕하세요. {name}입니다. 잘부탁드립니다.</div>
//         </div>
//     );
// };

// export default App;
