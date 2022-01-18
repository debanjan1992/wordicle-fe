import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import { WordService } from '../WordService';
import Word from "../GameGrid/Word";

interface GameOverDialogProps {
    visible: boolean;
    onDismiss: (ereason: string) => any;
    onRetry: () => any;
    onStartNewGame: () => any;
}

const GameOverDialog = (props: GameOverDialogProps) => {
    const [answer, setAnswer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const revealWord = () => {
        WordService.revealWord().then(word => setAnswer(word));
    };

    return (
        <Dialog onClose={(e, r) => props.onDismiss(r)} open={props.visible} disableEscapeKeyDown={true}>
            <DialogTitle>Game Over!</DialogTitle>
            <DialogContent>
                <p>Sorry! You have run out of chances to guess the word!</p>
                {answer !== null && (
                    <Word word={answer} map={Array.from({ length: answer.length }, () => "correct")}></Word>
                )}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={props.onRetry} disabled={answer !== null || isLoading}>Get more chances</Button>
                <Box>
                    <Button variant="outlined" onClick={props.onRetry} disabled={answer !== null || isLoading}>Reveal Word</Button>
                    {isLoading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-12px',
                                marginLeft: '-12px',
                            }}></CircularProgress>
                    )}

                </Box>
                <Button variant="contained" onClick={() => props.onStartNewGame()} disabled={isLoading}>New Word</Button>
            </DialogActions>
        </Dialog>
    );
};

export default GameOverDialog;