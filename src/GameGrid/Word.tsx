import React, { ReactNode } from "react";
import ConfigContext from "../ConfigContext";
import { GameBoxWrapper, WordWrapper } from "../Wordicle.styles";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";

interface GameBoxProps {
  letter?: string;
  colorCode: string;
  snapshotMode?: boolean;
  wordPosition?: number;
}

interface WordProps {
  wordLength?: number;
  word: string;
  map: Array<string>;
  snapshotMode?: boolean;
  position?: number;
  badgeCount?: number;
}

const GameBox = ({
  letter,
  colorCode,
  snapshotMode,
  wordPosition,
}: GameBoxProps) => {
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
    <GameBoxWrapper
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
    </GameBoxWrapper>
  );
};

const Word = (props: WordProps) => {
  const generateGameBoxes = () => {
    const renderedContent: ReactNode[] = [];
    for (let i = 1; i <= (props.wordLength || props.word.length); i++) {
      renderedContent.push(
        <GameBox
          key={i}
          wordPosition={props.position}
          letter={props.word === "" ? "" : props.word[i - 1]}
          colorCode={props.map ? props.map[i - 1] : ""}
          snapshotMode={props.snapshotMode}
        />
      );
    }
    return renderedContent;
  };

  if (props.word === undefined) {
    return null;
  }

  return (
    <WordWrapper>
      {generateGameBoxes()}
      {props.badgeCount !== undefined && (
        <Tooltip
          title={"This word has been solved " + props.badgeCount + " times."}
        >
          <Badge color="primary" badgeContent={props.badgeCount || 0}></Badge>
        </Tooltip>
      )}
    </WordWrapper>
  );
};

export default Word;
