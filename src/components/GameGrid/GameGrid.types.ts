export interface GameGridProps {
  wordLength: number;
  words: string[];
  map: Array<Array<string>>;
  dontShowEmpty?: boolean;
  snapshotMode?: boolean;
  visible: boolean;
}

export interface LetterBox {
  letter?: string;
  colorCode: string;
  snapshotMode?: boolean;
  wordPosition?: number;
}

export interface WordProps {
  wordLength?: number;
  word: string;
  map: Array<string>;
  snapshotMode?: boolean;
  position?: number;
  badgeCount?: number;
}
