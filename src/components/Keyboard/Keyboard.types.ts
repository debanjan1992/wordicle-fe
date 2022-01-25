import { ReactNode } from "react";

export interface KeyboardProps {
  onKeyPressed: (key: string) => any;
  activeWord: string;
  wordLength: number;
  visible: boolean;
}

export interface KeyProps {
  children: ReactNode;
  isDarkMode: boolean;
  disabled?: boolean;
  colorCode?: string;
  onClick: () => any;
}
