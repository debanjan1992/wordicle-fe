import { ReactNode } from "react";
import { WordWrapper } from "./GameGrid.styles";
import { WordProps } from "./GameGrid.types";
import LetterBox from "./LetterBox";
import ConfigContext from "../../config/ConfigContext";
import React from "react";

const Word = (props: WordProps) => {
  const sessionWordLength = React.useContext(ConfigContext).wordLength;

  const generateGameBoxes = () => {
    const renderedContent: ReactNode[] = [];
    for (
      let i = 1;
      i <= (!props.wordLength ? sessionWordLength : props.wordLength);
      i++
    ) {
      renderedContent.push(
        <LetterBox
          key={i}
          letter={props.word === "" ? "" : props.word[i - 1]}
          colorCode={props.map ? props.map[i - 1] : ""}
        />
      );
    }
    return renderedContent;
  };

  if (props.word === undefined) {
    return null;
  }

  return <WordWrapper>{generateGameBoxes()}</WordWrapper>;
};

export default Word;
