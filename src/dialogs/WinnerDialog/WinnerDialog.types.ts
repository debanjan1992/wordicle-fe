export interface WinnerDialogProps {
  visible: boolean;
  onDismiss: (reason: string) => any;
  goBackToMainMenu: () => any;
}
