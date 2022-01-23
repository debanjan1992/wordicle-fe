import React from "react";

const ConfigContext = React.createContext({
    darkMode: false,
    chances: 6,
    isLoading: false
});

export default ConfigContext;