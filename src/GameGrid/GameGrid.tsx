import React from "react";
import ConfigContext from "../ConfigContext";
import { GameGridWrapper } from "../Wordle.styles";
import { WordService } from "../WordService";
import Word from "./Word";

interface GameGridProps {
    wordLength: number;
    words: string[];
    map: Array<Array<string>>;
}

const GameGrid = (props: GameGridProps) => {
    const chances = React.useContext(ConfigContext).chances;
    const generateWords = () => {
        const renderedContent = [];
        for (let i = 0; i < chances; i++) {
            renderedContent.push(<Word key={i + 1} wordLength={WordService.getWordLength()} word={props.words[i]} map={props.map[i]} />);
        }
        return renderedContent;
    };
    return (
        <GameGridWrapper>
            {generateWords()}
        </GameGridWrapper>
    );
};

export default GameGrid;