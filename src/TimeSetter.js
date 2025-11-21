import React from "react";
import "./TimeSetter.css";

const TimeSetter = ({
  minutes,
  setMinutes,
  seconds,
  setSeconds,
  handleSetTime,
  handleTimeChange,
  handleSecondsChange,
}) => {
  return (
    <div className="time-setter">
      <h2>時間設定</h2>
      <div className="input-group">
        <button onClick={() => handleTimeChange(setMinutes, 1, 0, 999)}>
          +
        </button>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          min="0"
          max="999"
          placeholder="分"
        />
        <button onClick={() => handleTimeChange(setMinutes, -1, 0, 999)}>
          -
        </button>
      </div>
      <span>:</span>
      <div className="input-group">
        <button onClick={() => handleSecondsChange(setSeconds, 1)}>+</button>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          min="0"
          max="59"
          placeholder="秒"
        />
        <button onClick={() => handleSecondsChange(setSeconds, -1)}>-</button>
      </div>
      <button onClick={handleSetTime}>セット</button>
    </div>
  );
};

export default TimeSetter;
