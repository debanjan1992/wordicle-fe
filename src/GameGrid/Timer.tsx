import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ConfigContext from "../ConfigContext";
import SessionService, { GAME_STATUS, SESSION_KEYS } from "../SessionService";

interface TimeLeftType {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export const TimerWrapper = styled.div<{ isDarkMode: boolean; }>`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;

    >div {
        margin-right: 2px;
        font-size: 11px;
        font-weight: bold;
        color: ${props => props.isDarkMode ? "#d7dadc" : "black"};
    }
`;

const calculateTimeLeft = (): TimeLeftType => {
    const startTime = SessionService.getFromSession(SESSION_KEYS.StartTime) || 0;
    let difference = new Date().getTime() - +startTime;
    let timeLeft: TimeLeftType = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
};

const Timer = () => {
    const [time, setTime] = useState(calculateTimeLeft());
    const isDarkMode = React.useContext(ConfigContext).darkMode;

    useEffect(() => {
        if (SessionService.getFromSession(SESSION_KEYS.GameStatus) === GAME_STATUS.InProgress) {
            const timer = setTimeout(() => setTime(calculateTimeLeft()), 1000);
            return () => clearTimeout(timer);
        }
    }, [time]);

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