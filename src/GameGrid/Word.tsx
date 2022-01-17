import React from "react";
import ConfigContext from "../ConfigContext";
import { GameBoxWrapper, WordWrapper } from "../Wordle.styles";

interface GameBoxProps {
    letter?: string;
    colorCode: string;
}

interface WordProps {
    wordLength?: number;
    startIndex?: number;
    word: string;
    map: Array<string>;
}

const GameBox = ({ letter, colorCode }: GameBoxProps) => {
    const isDarkMode = React.useContext(ConfigContext).darkMode;

    const getClassName = () => {
        let list = colorCode || "empty";
        if (letter !== undefined) {
            list = list + " filled";
        } else {
            list = list + " not-filled";
        }
        return list;
    };

    return (
        <GameBoxWrapper className={getClassName()} isDarkMode={isDarkMode}>
            <span>{letter}</span>
        </GameBoxWrapper>
    );
};

const Word = (props: WordProps) => {
    const generateGameBoxes = () => {
        const renderedContent = [];
        for (let i = 1; i <= (props.wordLength || props.word.length); i++) {
            renderedContent.push(<GameBox key={i} letter={props.word[i - 1]} colorCode={props.map[i - 1]} />);
        }
        return renderedContent;
    };

    if (props.word === undefined) {
        return null;
    }

    return (
        <WordWrapper>
            {generateGameBoxes()}
        </WordWrapper>
    );
}

export default Word;