import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import TimeSetter from "./TimeSetter";
import AlarmSetter from "./AlarmSetter";
import AlarmList from "./AlarmList";
import alarmSoundFile from "./alarm.mp3";

// ゼロパディングして2桁の文字列を返すヘルパー関数
const padTime = (time) => time.toString().padStart(2, "0");

function App() {
  // タイマーの残り時間（秒単位）
  const [timeLeft, setTimeLeft] = useState(0);
  // ユーザーが設定した時間（分と秒）
  const [minutes, setMinutes] = useState("5");
  const [seconds, setSeconds] = useState("00");
  // タイマーが動作中かどうかの状態
  const [isActive, setIsActive] = useState(false);
  const [alarmPoints, setAlarmPoints] = useState([]);
  // 任意のアラーム時間設定（秒単位の配列）
  const [newAlarmPointMinutes, setNewAlarmPointMinutes] = useState("0");
  const [newAlarmPointSeconds, setNewAlarmPointSeconds] = useState("00");

  // アラーム音の参照
  const alarmSound = useRef(null);
  // setIntervalのIDを保持
  const intervalRef = useRef(null);

  // タイマーのロジック
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // タイマー終了
      alarmSound.current.currentTime = 0;
      alarmSound.current.play(); // 1回目
      // 1秒後にもう一度鳴らす
      setTimeout(() => {
        if (alarmSound.current) {
          alarmSound.current.currentTime = 0;
          alarmSound.current.play(); // 2回目
        }
      }, 1000);
      setIsActive(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

  // 任意のアラームポイントでのアラーム再生
  useEffect(() => {
    if (alarmPoints.includes(timeLeft) && timeLeft > 0) {
      alarmSound.current.play();
    }
  }, [timeLeft, alarmPoints]);

  // スタート・ストップ処理
  const handleToggle = () => {
    if (timeLeft > 0) {
      setIsActive(!isActive);
    }
  };

  // リセット処理
  const handleReset = () => {
    setIsActive(false);
    const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    setTimeLeft(totalSeconds);
  };

  // 時間設定の適用
  const handleSetTime = () => {
    const totalSeconds = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
    if (!isNaN(totalSeconds) && totalSeconds >= 0) {
      // 上限は 999分59秒
      if (totalSeconds > 999 * 60 + 59) {
        alert("タイマーは最大999分59秒まで設定できます。");
        return;
      }
      setTimeLeft(totalSeconds);
      setIsActive(false);
    }
  };

  // 時間を増減させる汎用ハンドラ
  const handleTimeChange = (setter, amount, min, max) => {
    setter((prev) => {
      const current = parseInt(prev, 10) || 0;
      let newValue = current + amount;
      if (newValue < min) newValue = min;
      if (newValue > max) newValue = max;
      return newValue.toString();
    });
  };

  // 秒数を増減させるハンドラ（0-59の範囲）
  const handleSecondsChange = (setter, amount) => {
    setter((prev) => {
      const current = parseInt(prev, 10) || 0;
      let newValue = current + amount;
      if (newValue < 0) newValue = 59;
      if (newValue > 59) newValue = 0;
      return padTime(newValue);
    });
  };

  // 任意のアラームポイントを追加
  const addAlarmPoint = () => {
    const minutes = parseInt(newAlarmPointMinutes, 10) || 0;
    const seconds = parseInt(newAlarmPointSeconds, 10) || 0;
    const pointInSeconds = minutes * 60 + seconds;

    if (pointInSeconds > 0 && !alarmPoints.includes(pointInSeconds)) {
      setAlarmPoints([...alarmPoints, pointInSeconds].sort((a, b) => b - a));
      setNewAlarmPointMinutes("0");
      setNewAlarmPointSeconds("00");
    }
  };

  // 任意のアラームポイントを削除
  const removeAlarmPoint = (point) => {
    setAlarmPoints(alarmPoints.filter((p) => p !== point));
  };

  // 表示用の時間フォーマット
  const displayMinutes = Math.floor(timeLeft / 60);
  const displaySeconds = timeLeft % 60;

  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>タイマー</h1> */}
        {/* アラーム音の要素。publicフォルダに音声ファイルを配置してください */}
        <audio ref={alarmSound} src={alarmSoundFile} preload="auto"></audio>

        <div className="timer-display">
          {displayMinutes}:{padTime(displaySeconds)}
        </div>

        <div className="controls">
          <button onClick={handleToggle}>
            {isActive ? "一時停止" : "スタート"}
          </button>
          <button onClick={handleReset}>リセット</button>
        </div>

        <TimeSetter
          minutes={minutes}
          setMinutes={setMinutes}
          seconds={seconds}
          setSeconds={setSeconds}
          handleSetTime={handleSetTime}
          handleTimeChange={handleTimeChange}
          handleSecondsChange={handleSecondsChange}
        />

        <AlarmSetter
          newAlarmPointMinutes={newAlarmPointMinutes}
          setNewAlarmPointMinutes={setNewAlarmPointMinutes}
          newAlarmPointSeconds={newAlarmPointSeconds}
          setNewAlarmPointSeconds={setNewAlarmPointSeconds}
          addAlarmPoint={addAlarmPoint}
          handleTimeChange={handleTimeChange}
          handleSecondsChange={handleSecondsChange}
        />

        <AlarmList
          alarmPoints={alarmPoints}
          removeAlarmPoint={removeAlarmPoint}
        />
      </header>
    </div>
  );
}

export default App;
