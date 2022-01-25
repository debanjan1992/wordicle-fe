export interface GameOverDialogProps {
  visible: boolean;
  onDismiss: (reason: string) => any;
  onMainMenuClick: () => any;
}
