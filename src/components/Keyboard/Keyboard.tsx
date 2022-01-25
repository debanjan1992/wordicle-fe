import { KeyboardWrapper, KeyWrapper } from "./Keyboard.styles";
import Backspace from "@mui/icons-material/Backspace";
import ConfigContext from "../../config/ConfigContext";
import React from "react";
import { KeyboardProps } from "./Keyboard.types";
import Key from "./Key";

const Keyboard = ({
  onKeyPressed,
  activeWord,
  wordLength,
  visible,
}: KeyboardProps) => {
  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const thirdRow = ["ENTER", "Z", "X", "C", "V", "B", "N", "M"];
  const context = React.useContext(ConfigContext);
  const isDarkMode = context.darkMode;
  const wordsFromSession = context.words;
  const mappingFromSession = context.mapping;
  const isLoading = context.isLoading;

  const onKeyPress = (key: string) => {
    onKeyPressed(key);
  };

  const getColorCode = (key: string) => {
    let colorCode = "";
    if (wordsFromSession && mappingFromSession) {
      wordsFromSession.forEach((word: string, wordIndex: number) => {
        const letters = word.split("");
        const letterIndex = letters.findIndex((l) => l === key);
        if (letterIndex !== -1) {
          const codeFromSession = mappingFromSession[wordIndex][letterIndex];
          if (colorCode === "" || colorCode !== "correct") {
            colorCode = codeFromSession;
          }
        }
      });
    }
    return colorCode;
  };

  return (
    <KeyboardWrapper visible={visible}>
      <div className="row">
        {firstRow.map((letter) => (
          <Key
            key={letter}
            disabled={isLoading}
            colorCode={getColorCode(letter)}
            onClick={() => onKeyPress(letter)}
            isDarkMode={isDarkMode}
          >
            {letter}
          </Key>
        ))}
      </div>
      <div className="row">
        {secondRow.map((letter) => (
          <Key
            key={letter}
            disabled={isLoading}
            colorCode={getColorCode(letter)}
            onClick={() => onKeyPress(letter)}
            isDarkMode={isDarkMode}
          >
            {letter}
          </Key>
        ))}
      </div>
      <div className="row">
        {thirdRow.map((letter) => {
          if (letter === "ENTER") {
            return (
              <Key
                key={"enter-" + letter}
                colorCode={getColorCode(letter)}
                disabled={
                  !activeWord || activeWord.length < wordLength || isLoading
                }
                onClick={() => onKeyPress(letter)}
                isDarkMode={isDarkMode}
              >
                {letter}
              </Key>
            );
          } else {
            return (
              <Key
                key={letter}
                disabled={isLoading}
                colorCode={getColorCode(letter)}
                onClick={() => onKeyPress(letter)}
                isDarkMode={isDarkMode}
              >
                {letter}
              </Key>
            );
          }
        })}
        <Key
          colorCode={getColorCode("")}
          onClick={() => onKeyPress("BACKSPACE")}
          isDarkMode={isDarkMode}
          disabled={isLoading}
        >
          <Backspace
            style={{
              width: "18px",
              height: "18px",
              position: "relative",
              top: "3px",
            }}
          />
        </Key>
      </div>
    </KeyboardWrapper>
  );
};

export default Keyboard;
