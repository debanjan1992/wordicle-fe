import React, { ReactNode } from "react";
import ConfigContext from "../ConfigContext";
import { GameGridWrapper } from "../Wordicle.styles";
import { WordService } from "../WordService";
import StatsBar from "./StatsBar";
import Word from "./Word";

interface GameGridProps {
  wordLength: number;
  words: string[];
  map: Array<Array<string>>;
  dontShowEmpty?: boolean;
  snapshotMode?: boolean;
  visible: boolean;
}

const GameGrid = (props: GameGridProps) => {
  const chances = React.useContext(ConfigContext).chances;
  const generateWords = () => {
    const renderedContent: ReactNode[] = [];
    for (let i = 0; i < chances; i++) {
      if (!props.dontShowEmpty) {
        renderedContent.push(
          <Word
            key={i + 1}
            snapshotMode={props.snapshotMode}
            wordLength={WordService.getWordLength()}
            word={props.words[i]}
            map={props.map[i]}
            position={i + 1}
          />
        );
      } else {
        if (props.dontShowEmpty && props.words[i] !== "") {
          renderedContent.push(
            <Word
              key={i + 1}
              snapshotMode={props.snapshotMode}
              wordLength={WordService.getWordLength()}
              word={props.words[i]}
              map={props.map[i]}
              position={i + 1}
            />
          );
        }
      }
    }
    return renderedContent;
  };
  return (
    <GameGridWrapper visible={props.visible}>
      {props.visible && <StatsBar />}
      <div className="words-wrapper">{generateWords()}</div>
    </GameGridWrapper>
  );
};

export default GameGrid;
