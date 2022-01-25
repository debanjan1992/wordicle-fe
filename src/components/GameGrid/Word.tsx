import { ReactNode } from "react";
import { WordWrapper } from "./GameGrid.styles";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { WordProps } from "./GameGrid.types";
import LetterBox from "./LetterBox";

const Word = (props: WordProps) => {
  const generateGameBoxes = () => {
    const renderedContent: ReactNode[] = [];
    for (let i = 1; i <= (props.wordLength || props.word.length); i++) {
      renderedContent.push(
        <LetterBox
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
