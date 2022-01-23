import React from "react";

interface GameContext {
    darkMode: boolean;
    chances: number;
    isLoading: boolean;
    startTime: number;
}

const ConfigContext = React.createContext({
    darkMode: false,
    chances: 6,
    isLoading: false,
    startTime: new Date().getTime()
} as GameContext);

export default ConfigContext;