import { KeyboardWrapper, KeyWrapper } from "./Wordicle.styles";
import Backspace from "@mui/icons-material/Backspace";
import { ReactNode } from "react";
import ConfigContext from "./ConfigContext";
import React from "react";
import SessionService, { SESSION_KEYS } from "./SessionService";

interface KeyboardProps {
    onKeyPressed: (key: string) => any;
    activeWord: string;
    wordLength: number;
}

interface KeyProps {
    children: ReactNode;
    isDarkMode: boolean;
    disabled?: boolean;
    colorCode?: string;
    onClick: () => any;
}

const Key = ({ children, disabled, colorCode, onClick }: KeyProps) => {
    const isDarkMode = React.useContext(ConfigContext).darkMode;

    return (
        <KeyWrapper className={colorCode || ""} disabled={disabled} onClick={() => !disabled && onClick()} isDarkMode={isDarkMode}>
            <span>{children}</span>
        </KeyWrapper>
    );
};

const Keyboard = ({ onKeyPressed, activeWord, wordLength }: KeyboardProps) => {
    const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const thirdRow = ["ENTER", "Z", "X", "C", "V", "B", "N", "M"];
    const isDarkMode = React.useContext(ConfigContext).darkMode;
    const wordsFromSession = SessionService.getFromSession(SESSION_KEYS.Words);
    const mappingFromSession = SessionService.getFromSession(SESSION_KEYS.Mapping);

    const onKeyPress = (key: string) => {
        onKeyPressed(key);
    };

    const getColorCode = (key: string) => {
        let colorCode = "";
        if (wordsFromSession && mappingFromSession) {
            wordsFromSession.forEach((word: string, wordIndex: number) => {
                const letters = word.split("");
                const letterIndex = letters.findIndex(l => l === key);
                if (letterIndex !== -1) {
                    const codeFromSession = mappingFromSession[wordIndex][letterIndex];
                    if (colorCode === "" || colorCode !== "correct") {
                        colorCode = codeFromSession;
                    }
                }
            })
        }
        return colorCode;
    };

    return (
        <KeyboardWrapper>
            <div className="row">
                {firstRow.map(letter => <Key key={letter} colorCode={getColorCode(letter)} onClick={() => onKeyPress(letter)} isDarkMode={isDarkMode}>{letter}</Key>)}
            </div>
            <div className="row">
                {secondRow.map(letter => <Key key={letter} colorCode={getColorCode(letter)} onClick={() => onKeyPress(letter)} isDarkMode={isDarkMode}>{letter}</Key>)}
            </div>
            <div className="row">
                {thirdRow.map(letter => {
                    if (letter === "ENTER") {
                        return <Key key={"enter-" + letter} colorCode={getColorCode(letter)} disabled={!activeWord || activeWord.length < wordLength} onClick={() => onKeyPress(letter)} isDarkMode={isDarkMode}>{letter}</Key>;
                    } else {
                        return <Key key={letter} colorCode={getColorCode(letter)} onClick={() => onKeyPress(letter)} isDarkMode={isDarkMode}>{letter}</Key>;
                    }
                })}
                <Key colorCode={getColorCode("")} onClick={() => onKeyPress("BACKSPACE")} isDarkMode={isDarkMode}>
                    <Backspace style={{ width: "18px", height: "18px", position: "relative", top: "3px" }} />
                </Key>
            </div>
        </KeyboardWrapper>
    );
};

export default Keyboard;