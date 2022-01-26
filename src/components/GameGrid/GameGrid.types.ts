export interface GameGridProps {
  wordLength: number;
  words: string[];
  map: Array<Array<string>>;
  dontShowEmpty?: boolean;
  visible: boolean;
}

export interface LetterBox {
  letter?: string;
  colorCode: string;
}

export interface WordProps {
  wordLength?: number;
  word: string;
  map: Array<string>;
  position?: number;
  badgeCount?: number;
}
