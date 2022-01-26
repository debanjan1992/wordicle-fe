import React from "react";
import styled from "styled-components";
import ConfigContext from "../../config/ConfigContext";
import { TimeParts } from "../../dialogs/WinnerDialog/WinnerDialog.types";
import Timer, { TimerWrapper } from "./Timer";

const StatsBarWrapper = styled.div<{ isDarkMode: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 6px;
  box-sizing: border-box;

  .stat-box {
    text-align: center;
    label {
      font-size: 9px;
      color: ${(props) => (props.isDarkMode ? "#b8b8b8" : "#4b4b4b")};
    }
  }
`;

const StatsBar = () => {
  const context = React.useContext(ConfigContext);
  const getBestTimeParts = () => {
    let startTime = context.bestTime;

    startTime = startTime * 60;
    let timeLeft: TimeParts = { minutes: 0, seconds: 0 };

    if (startTime > 0) {
      timeLeft = {
        minutes: Math.floor((startTime / 60) % 60),
        seconds: Math.floor(startTime % 60),
      };
      return timeLeft;
    } else {
      return null;
    }
  };
  const bestTime = getBestTimeParts();
  const isDarkMode = context.darkMode;

  return (
    <StatsBarWrapper isDarkMode={isDarkMode}>
      <div className="stat-box">
        <label>Best Time</label>
        <TimerWrapper isDarkMode={isDarkMode}>
          {bestTime ? (
            <>
              <div className="minutes">{bestTime.minutes + "m"}</div>
              <div className="seconds">{bestTime.seconds + "s"}</div>
            </>
          ) : (
            <div className="seconds">NA</div>
          )}
        </TimerWrapper>
      </div>
      <div className="stat-box">
        <label>Your Time</label>
        <Timer />
      </div>
    </StatsBarWrapper>
  );
};

export default StatsBar;
