import React from "react";
import ConfigContext from "../../config/ConfigContext";
import { LetterBoxWrapper } from "./GameGrid.styles";
import { LetterBox } from "./GameGrid.types";

const LetterBox = ({
  letter,
  colorCode,
  snapshotMode,
  wordPosition,
}: LetterBox) => {
  const context = React.useContext(ConfigContext);
  const isDarkMode = context.darkMode;
  const isLoading = context.isLoading;
  const wordLength = context.wordLength;
  const wordIdx = context.wordIdx;

  const getClassName = () => {
    let list = colorCode || "empty";
    if (letter !== undefined && letter !== "") {
      list = list + " filled";
    } else {
      list = list + " not-filled";
    }
    return list;
  };

  return (
    <LetterBoxWrapper
      isActiveBox={
        !wordPosition
          ? false
          : wordPosition - 1 === wordIdx && isLoading
          ? true
          : false
      }
      className={getClassName()}
      isDarkMode={isDarkMode}
      wordLength={wordLength}
      snapshotMode={snapshotMode}
    >
      <span>{letter}</span>
    </LetterBoxWrapper>
  );
};

export default LetterBox;
