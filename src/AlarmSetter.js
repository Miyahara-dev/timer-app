import React from "react";
import "./AlarmSetter.css";

const AlarmSetter = ({
  newAlarmPointMinutes,
  setNewAlarmPointMinutes,
  newAlarmPointSeconds,
  setNewAlarmPointSeconds,
  addAlarmPoint,
  handleTimeChange,
  handleSecondsChange,
}) => {
  return (
    <div className="alarm-setter">
      <h2>アラーム通知設定 (残り時間)</h2>
      <div className="input-group">
        <button
          onClick={() => handleTimeChange(setNewAlarmPointMinutes, 1, 0, 999)}
        >
          +
        </button>
        <input
          type="number"
          value={newAlarmPointMinutes}
          onChange={(e) => setNewAlarmPointMinutes(e.target.value)}
          placeholder="分"
          min="0"
          max="999"
        />
        <button
          onClick={() => handleTimeChange(setNewAlarmPointMinutes, -1, 0, 999)}
        >
          -
        </button>
      </div>
      <span>:</span>
      <div className="input-group">
        <button onClick={() => handleSecondsChange(setNewAlarmPointSeconds, 1)}>
          +
        </button>
        <input
          type="number"
          value={newAlarmPointSeconds}
          onChange={(e) => setNewAlarmPointSeconds(e.target.value)}
          placeholder="秒"
          min="0"
          max="59"
        />
        <button
          onClick={() => handleSecondsChange(setNewAlarmPointSeconds, -1)}
        >
          -
        </button>
      </div>
      <button onClick={addAlarmPoint}>追加</button>
    </div>
  );
};

export default AlarmSetter;
