import { useRef, useEffect } from 'react';

// const  [isRunning, setRunning] = useState(true);
// useInterval(() => {
//     console.log('hello');
// }, isRunning ? 1000 : null );

// 1초 뒤에 가위
// 2초 뒤에 가위
// 3 초 뒤에 가위


// setInterval은 호출되고 나서 delay 이후에 callback을 실행, 따라서 1.1초 + 1초 = 2.1초
// callback이 바귀어도 새로 setInterval이 안되지만 최신 callback을 참조 가능.
function useInterval(callback, delay) {

    const saveCallback = useRef();

    useEffect(() => {
        saveCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            saveCallback.current();
        }
        
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }

    }, [delay]);

    return saveCallback.current;


}

export default useInterval;