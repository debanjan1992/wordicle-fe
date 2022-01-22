import styled from "styled-components";
import Button from "@mui/material/Button";
import ConfigContext from "./ConfigContext";
import React from "react";

interface NewGameProps {
    visible: boolean;
    onStart: () => any;
}

const NewGameWrapper = styled.div<{ visible: boolean; isDarkMode: boolean; }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    transition: all 1s;
    transform: ${ props => props.visible ? "translateY(0%)" : "translateY(100%)"};
    opacity: ${ props => props.visible ? 1 : 0};
    z-index: 100;
`;

const NewGame = ({ visible, onStart }: NewGameProps) => {
    const isDarkMode = React.useContext(ConfigContext).darkMode;
    return (
        <NewGameWrapper visible={visible} isDarkMode={isDarkMode}>
            <Button variant="contained" color="error" onClick={onStart}>NEW GAME</Button>
        </NewGameWrapper>
    );
};

export default NewGame;