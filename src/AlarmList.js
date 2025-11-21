import React from "react";
import "./AlarmList.css";

const AlarmList = ({ alarmPoints, removeAlarmPoint }) => {
  return (
    <div className="alarm-list">
      <ul>
        {alarmPoints.map((point) => (
          <li key={point}>
            残り {Math.floor(point / 60)}分 {point % 60}秒
            <button onClick={() => removeAlarmPoint(point)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlarmList;
