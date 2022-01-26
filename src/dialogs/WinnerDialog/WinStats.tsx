import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import ConfigContext from "../../config/ConfigContext";
import { WordService } from "../../services/WordService";
import { WinStatsWrapper } from "./WinnerDialog.styles";

const WinStats = () => {
  const context = React.useContext(ConfigContext);
  const [totalPlayed, setTotalPlayed] = useState(0);
  const [bestTimeInMinutes, setBestTimeInMinutes] = useState(context.bestTime);
  const getTime = (timeInSeconds: number) => {
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (timeInSeconds > 0) {
      timeLeft = {
        days: Math.floor(timeInSeconds / (60 * 60 * 24)),
        hours: Math.floor((timeInSeconds / (60 * 60)) % 24),
        minutes: Math.floor((timeInSeconds / 60) % 60),
        seconds: Math.floor(timeInSeconds % 60),
      };
    }

    return timeLeft;
  };

  const timeTaken = getTime(context.gameDuration * 60);
  const fastestTimeTaken = getTime(
    bestTimeInMinutes === "NA" ? 0 : +bestTimeInMinutes * 60
  );

  const revealWord = () => {
    WordService.revealWord().then((response) => {
      setBestTimeInMinutes(response.stats.bestTime);
      setTotalPlayed(+response.stats.totalHits);
    });
  };

  useEffect(() => {
    revealWord();
  }, []);

  return (
    <WinStatsWrapper isDarkMode={context.darkMode}>
      <div className="winner-stat">
        <label>Time taken</label>
        <div className="stat-value">
          {timeTaken.days !== 0 && (
            <span className="days">
              {timeTaken.days}
              <span className="stat-value-subtext">s</span>
            </span>
          )}
          {timeTaken.hours !== 0 && (
            <span className="hours">
              {timeTaken.hours}
              <span className="stat-value-subtext">s</span>
            </span>
          )}
          <span className="minutes">
            {timeTaken.minutes}
            <span className="stat-value-subtext">s</span>
          </span>
          <span className="seconds">
            {timeTaken.seconds}
            <span className="stat-value-subtext">s</span>
          </span>
        </div>
      </div>
      <div className="divider"></div>
      <div className="winner-stat">
        <label>Chances</label>
        <div className="stat-value">
          {context.wordIdx}/{context.chances}
        </div>
      </div>
      <div className="divider"></div>
      <div className="winner-stat">
        <Tooltip title="This is the fastest time in which this word has been solved">
          <label>Best time</label>
        </Tooltip>
        <div className="stat-value">
          <>
            {fastestTimeTaken.days !== 0 && (
              <span className="days">
                {fastestTimeTaken.days}
                <span className="stat-value-subtext">d</span>
              </span>
            )}
            {fastestTimeTaken.hours !== 0 && (
              <span className="hours">
                {fastestTimeTaken.hours}
                <span className="stat-value-subtext">h</span>
              </span>
            )}
            <span className="minutes">
              {fastestTimeTaken.minutes}
              <span className="stat-value-subtext">m</span>
            </span>
            <span className="seconds">
              {fastestTimeTaken.seconds}
              <span className="stat-value-subtext">s</span>
            </span>
          </>
        </div>
      </div>
      <div className="divider"></div>
      <div className="winner-stat">
        <label>Word solved</label>
        <div className="stat-value">
          {totalPlayed}
          <span className="stat-value-subtext">times</span>
        </div>
      </div>
    </WinStatsWrapper>
  );
};

export default WinStats;
