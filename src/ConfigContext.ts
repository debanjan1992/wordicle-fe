import React from "react";
import { GAME_STATUS } from "./SessionService";
import { WordService } from "./WordService";

const getInitialWords = (chances: number) => {
  const wordsMetadata = WordService.getWordsMetadataFromSessionStorage();
  if (wordsMetadata.words && wordsMetadata.words.length > 0) {
    return wordsMetadata.words;
  } else {
    return Array.from({ length: chances }, () => "");
  }
};

const getInitialMapping = (chances: number) => {
  const wordsMetadata = WordService.getWordsMetadataFromSessionStorage();
  if (wordsMetadata.mapping && wordsMetadata.mapping.length > 0) {
    return wordsMetadata.mapping;
  } else {
    return Array.from({ length: chances }, () => [] as string[]);
  }
};

interface GameContext {
  darkMode: boolean;
  chances: number;
  isLoading: boolean;
  startTime: number;
  gameStatus: GAME_STATUS;
  gameDuration: number;
  words: string[];
  wordIdx: number;
  mapping: string[][];
  bestTime: string;
  sessionId: string | null;
  wordLength: number;
}

const ConfigContext = React.createContext({
  darkMode: false,
  chances: 6,
  isLoading: false,
  startTime: new Date().getTime(),
  words: getInitialWords(6),
  wordIdx: 0,
  mapping: getInitialMapping(6),
  bestTime: "NA",
  sessionId: null,
  wordLength: 0
} as GameContext);

export default ConfigContext;
