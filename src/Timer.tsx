import { useEffect, useState } from "react";
import styled from "styled-components";
import SessionService, { SESSION_KEYS } from "./SessionService";

interface TimeLeftType {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const TimerWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;

    >div {
        margin-right: 2px;
        font-size: 13px;
        font-weight: bold;
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
    
    console.log(timeLeft);
    return timeLeft;
}

const Timer = () => {
    const [time, setTime] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => setTime(calculateTimeLeft()), 1000);
        return () => clearTimeout(timer);
    }, [time]);

    return (
        <TimerWrapper>
            {time.days !== 0 && <div className="days">{time.days + "d"}</div>}
            {time.hours !== 0 && <div className="hours">{time.hours + "h"}</div>}
            <div className="minutes">{time.minutes + "m"}</div>
            <div className="seconds">{time.seconds + "s"}</div>
        </TimerWrapper>
    );
};

export default Timer;