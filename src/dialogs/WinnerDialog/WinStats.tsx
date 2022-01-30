import { Stack, Tooltip } from "@mui/material";
import React from "react";
import ConfigContext from "../../config/ConfigContext";
import { WinStatsWrapper } from "./WinnerDialog.styles";
import { WinStatsProps } from "./WinnerDialog.types";

const WinStats = (props: WinStatsProps) => {
  const context = React.useContext(ConfigContext);
  let isBest = false;

  // if (!props.bestTime || (props.playTime && props.bestTime && props.playTime < props.bestTime)) {
  //   isBest = true;
  // }

  return (
    <WinStatsWrapper isDarkMode={context.darkMode}>
      <div className="heading">STATS</div>
      <Stack spacing={1} width="100%">
        <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center">
          <div className="winner-stat">
            <label>Time taken</label>
            <div className={"stat-value " + (isBest ? "highlight" : "")}>
              {props.playTime ? (
                <>
                  <span className="minutes">
                    {props.playTime.minutes}
                    <span className="stat-value-subtext">m</span>
                  </span>
                  <span className="seconds">
                    {props.playTime.seconds}
                    <span className="stat-value-subtext">s</span>
                  </span>
                </>
              ) : (
                <span className="seconds">NA</span>
              )}
            </div>
          </div>
          <div className="divider"></div>
          <div className="winner-stat">
            <label>Avg time</label>
            <div className={"stat-value " + (isBest ? "highlight" : "")}>
              {props.avgTime ? (
                <>
                  <span className="minutes">
                    {props.avgTime.minutes}
                    <span className="stat-value-subtext">m</span>
                  </span>
                  <span className="seconds">
                    {props.avgTime.seconds}
                    <span className="stat-value-subtext">s</span>
                  </span>
                </>
              ) : (
                <span className="seconds">NA</span>
              )}
            </div>
          </div>
          <div className="divider"></div>
          <div className="winner-stat">
            <Tooltip title="This is the fastest time in which this word has been solved">
              <label>Best time</label>
            </Tooltip>
            <div className={"stat-value " + (isBest ? "highlight" : "")}>
              {props.bestTime ? (
                <>
                  <span className="minutes">
                    {props.bestTime.minutes}
                    <span className="stat-value-subtext">m</span>
                  </span>
                  <span className="seconds">
                    {props.bestTime.seconds}
                    <span className="stat-value-subtext">s</span>
                  </span>
                </>
              ) : (
                <span className="seconds">NA</span>
              )}
            </div>
          </div>
        </Stack>
        <Stack direction="row" display="flex" justifyContent="space-evenly" alignItems="center">
          <div className="winner-stat">
            <label>Chances</label>
            <div className="stat-value">
              {props.playedChances}/{props.totalChances}
            </div>
          </div>
          <div className="divider"></div>
          <div className="winner-stat">
            <label>Word solved</label>
            <div className="stat-value">
              {props.totalHitsForWord}
              <span className="stat-value-subtext">times</span>
            </div>
          </div>
        </Stack>
      </Stack>
    </WinStatsWrapper>
  );
};

export default WinStats;
