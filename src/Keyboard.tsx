import { KeyboardWrapper, KeyWrapper } from "./Wordle.styles";
import Backspace from "@mui/icons-material/Backspace";
import { ReactNode } from "react";
import ConfigContext from "./ConfigContext";
import React from "react";

interface KeyboardProps {
    onKeyPressed: (key: string) => any;
    activeWord: string;
    wordLength: number;
    disabledLetters: string[];
}

interface KeyProps {
    children: ReactNode;
    disabled?: boolean;
    isDarkMode: boolean;
    onClick: () => any;
}

const Key = ({ children, disabled, onClick }: KeyProps) => {
    const isDarkMode = React.useContext(ConfigContext).darkMode;
    return (
        <KeyWrapper disabled={disabled} onClick={onClick} isDarkMode={isDarkMode}>
            <span>{children}</span>
        </KeyWrapper>
    );
};

const Keyboard = ({ onKeyPressed, activeWord, disabledLetters, wordLength }: KeyboardProps) => {
    const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const thirdRow = ["ENTER", "Z", "X", "C", "V", "B", "N", "M"];
    const isDarkMode = React.useContext(ConfigContext).darkMode;

    const onKeyPress = (key: string) => {
        onKeyPressed(key);
    };

    const isLetterDisabled = (letter: string) => {
        return disabledLetters.includes(letter);
    };

    return (
        <KeyboardWrapper>
            <div className="row">
                {firstRow.map(letter => <Key key={letter} disabled={isLetterDisabled(letter)} onClick={() => onKeyPress(letter)} isDarkMode={isDarkMode}>{letter}</Key>)}
            </div>
            <div className="row">
                {secondRow.map(letter => <Key key={letter} disabled={isLetterDisabled(letter)} onClick={() => onKeyPress(letter)} isDarkMode={isDarkMode}>{letter}</Key>)}
            </div>
            <div className="row">
                {thirdRow.map(letter => {
                    if (letter === "ENTER") {
                        return <Key key={"enter-" + letter} disabled={!activeWord || activeWord.length < wordLength} onClick={() => onKeyPress(letter)} isDarkMode={isDarkMode}>{letter}</Key>;
                    } else {
                        return <Key key={letter} disabled={isLetterDisabled(letter)} onClick={() => onKeyPress(letter)} isDarkMode={isDarkMode}>{letter}</Key>;
                    }
                })}
                <Key onClick={() => onKeyPress("BACKSPACE")} isDarkMode={isDarkMode}>
                    <Backspace style={{ width: "18px", height: "18px", position: "relative", top: "3px" }} />
                </Key>
            </div>
        </KeyboardWrapper>
    );
};

export default Keyboard;