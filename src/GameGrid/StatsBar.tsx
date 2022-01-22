import React from "react";
import styled from "styled-components";
import ConfigContext from "../ConfigContext";
import SessionService, { SESSION_KEYS } from "../SessionService";
import Timer, { TimerWrapper } from "./Timer";

const StatsBarWrapper = styled.div<{ isDarkMode: boolean; }>`
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
            color: ${props => props.isDarkMode ? "#b8b8b8" : "#4b4b4b"};
        }
    }
`;

const StatsBar = () => {
    const getBestTimeParts = () => {
        let startTime = +SessionService.getFromSession(SESSION_KEYS.BestTime) || 0;
        startTime = startTime * 60;
        let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        if (startTime > 0) {
            timeLeft = {
                days: Math.floor(startTime / (60 * 60 * 24)),
                hours: Math.floor((startTime / (60 * 60)) % 24),
                minutes: Math.floor((startTime / 60) % 60),
                seconds: Math.floor(startTime % 60)
            };
        }

        return timeLeft;
    };
    const bestTime = getBestTimeParts();
    const isDarkMode = React.useContext(ConfigContext).darkMode;

    return (
        <StatsBarWrapper isDarkMode={isDarkMode}>
            <div className="stat-box">
                <label>Best Time</label>
                <TimerWrapper isDarkMode={isDarkMode}>
                    {bestTime.days !== 0 && <div className="days">{bestTime.days + "d"}</div>}
                    {bestTime.hours !== 0 && <div className="hours">{bestTime.hours + "h"}</div>}
                    <div className="minutes">{bestTime.minutes + "m"}</div>
                    <div className="seconds">{bestTime.seconds + "s"}</div>
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