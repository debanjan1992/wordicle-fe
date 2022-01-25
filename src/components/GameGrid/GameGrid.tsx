import React, { ReactNode } from "react";
import ConfigContext from "../../config/ConfigContext";
import { GameGridWrapper } from "./GameGrid.styles";
import { WordService } from "../../services/WordService";
import StatsBar from "./StatsBar";
import Word from "./Word";
import { GameGridProps } from "./GameGrid.types";

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
