import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [stoppedDuration, setStoppedDuration] = useState(0);
  const [timeBegan, setTimeBegan] = useState(null);
  const [timeStopped, setTimeStopped] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalID;

    const clockRunning = () => {
        const currentTime = new Date();
        const timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);
        const hour = timeElapsed.getUTCHours();
        const min = timeElapsed.getUTCMinutes();
        const sec = timeElapsed.getUTCSeconds();
        const ms = timeElapsed.getUTCMilliseconds();
  
        document.getElementById("display-area").innerHTML =
          (hour > 9 ? hour : "0" + hour) + ":" +
          (min > 9 ? min : "0" + min) + ":" +
          (sec > 9 ? sec : "0" + sec) + "." +
          (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
      };
  
      if (isRunning) {
        setTimeBegan((prevTimeBegan) => (prevTimeBegan === null ? new Date() : prevTimeBegan));
  
        if (timeStopped !== null) {
          setStoppedDuration((prevStoppedDuration) => prevStoppedDuration + (new Date() - timeStopped));
        }
  
        intervalID = setInterval(clockRunning, 10);
      }
  
      return () => clearInterval(intervalID);
    }, [isRunning, timeBegan, timeStopped, stoppedDuration]);
  
    const startStopwatch = () => {
      setIsRunning(true);
    };
  
    const stopStopwatch = () => {
      setIsRunning(false);
      setTimeStopped(new Date());
    };
  
    const resetStopwatch = () => {
      clearInterval();
      setStoppedDuration(0);
      setTimeBegan(null);
      setTimeStopped(null);
      document.getElementById("display-area").innerHTML = "00:00:00.000";
    };
  
    return (
      <div>
        <h1>Stopwatch</h1>
        <p id="display-area">00:00:00.000</p>
  
        <div>
          <button onClick={startStopwatch}>Start</button>
          <button className="stop-button" onClick={stopStopwatch}>Stop</button>
          <button onClick={resetStopwatch}>Reset</button>
        </div>
      </div>
    );
  };
  
  export default Stopwatch;
