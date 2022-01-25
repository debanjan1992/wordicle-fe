export interface SettingsDialogProps {
  visible: boolean;
  onToggleDarkMode: (darkMode: boolean) => any;
  onDismiss: (reason: string) => any;
}
