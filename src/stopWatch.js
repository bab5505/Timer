import React, {useState, useEffect} from 'react'; 

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalID;

        if (isRunning) {
            intervalID = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(intervalID);
    }, [isRunning]);

    const startStopwatch = () => {
        setIsRunning(true);
    };

    const stopStopwatch = () => {
        setIsRunning(false);
    };

    const resetStopwatch = () => {
        setTime(0);
        setIsRunning(false);
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
    
    return (
        <div>
            <h1>Stopwatch</h1>
            <p>{formatTime(time)}</p>

            <div>
                <button onClick={startStopwatch}>Start</button>
                <button onClick={stopStopwatch}>Stop</button>
                <button onClick={resetStopwatch}>Reset</button>
            </div>
        </div>
    );
};

export default Stopwatch;