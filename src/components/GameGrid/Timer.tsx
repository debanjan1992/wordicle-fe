import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { GAME_STATUS } from "../../config/CONSTANTS";
import ConfigContext from "../../config/ConfigContext";
import SessionStorageService from "../../services/SessionStorageService";

interface TimeLeftType {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const TimerWrapper = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;

  > div {
    margin-right: 2px;
    font-size: 11px;
    font-weight: bold;
    color: ${(props) => (props.isDarkMode ? "#d7dadc" : "black")};
  }
`;

const calculateTime = (startTime: number): TimeLeftType => {
  let timeLeft: TimeLeftType = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  if (startTime !== null) {
    let difference = new Date().getTime() - startTime;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
  }

  return timeLeft;
};

const Timer = () => {
  const context = React.useContext(ConfigContext);
  const startTime = context.startTime;
  const isDarkMode = context.darkMode;
  const [time, setTime] = useState(calculateTime(startTime));

  useEffect(() => {
    console.debug(time, startTime, context.gameStatus);
    if (
      context.gameStatus !== GAME_STATUS.GameOverLost &&
      context.gameStatus !== GAME_STATUS.GameOverWin
    ) {
      const timer = setTimeout(() => setTime(calculateTime(startTime)), 1000);
      return () => clearTimeout(timer);
    }
  }, [time, startTime]);

  return (
    <TimerWrapper isDarkMode={isDarkMode}>
      {time.days !== 0 && <div className="days">{time.days + "d"}</div>}
      {time.hours !== 0 && <div className="hours">{time.hours + "h"}</div>}
      <div className="minutes">{time.minutes + "m"}</div>
      <div className="seconds">{time.seconds + "s"}</div>
    </TimerWrapper>
  );
};

export default Timer;
