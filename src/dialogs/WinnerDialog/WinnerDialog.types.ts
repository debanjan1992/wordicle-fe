export interface WinnerDialogProps {
  visible: boolean;
  onDismiss: (reason: string) => any;
  goBackToMainMenu: () => any;
}

export interface TimeParts {
  minutes: number;
  seconds: number;
}

export interface WinStatsProps {
  totalHitsForWord: number;
  playTime: TimeParts | null;
  bestTime: TimeParts | null;
  playedChances: number;
  totalChances: number;
}
