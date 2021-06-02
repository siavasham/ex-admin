import React, { useRef, useState, useEffect } from 'react';

export default function Timer(props) {
    const [ms, setMs] = useState(props.ms * 1000);
    const savedCallback = useRef();
    let id;
    function callback() {
        setMs(ms - 1000);
    }

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const format = (time) => {
        let seconds = Math.floor(time / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds %= 60;
        minutes = minutes < 1 ? '00' : minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 1 ? '00' : seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`;
    }

    if (ms <= 0) {
        clearInterval(id)
        props.onDone();
        return null;
    }
    return (
        <div>{format(ms)}</div>
    )

}

