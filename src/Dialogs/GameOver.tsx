import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';

interface GameOverDialogProps {
    visible: boolean;
    onDismiss: (ereason: string) => any;
    onRetry: () => any;
    onStartNewGame: () => any;
}

const GameOverDialog = (props: GameOverDialogProps) => {

    return (
        <Dialog onClose={(e, r) => props.onDismiss(r)} open={props.visible} disableEscapeKeyDown={true}>
            <DialogTitle>Game Over!</DialogTitle>
            <DialogContent>Sorry! You have run out of chances to guess the word!</DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={props.onRetry}>Get more chances</Button>
                <Button variant="contained" onClick={() => props.onStartNewGame()}>New Word</Button>
            </DialogActions>
        </Dialog>
    );
};

export default GameOverDialog;