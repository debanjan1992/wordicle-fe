import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { WordService } from '../WordService';
import Word from "../GameGrid/Word";
import { useState } from "react";

interface GameOverDialogProps {
    visible: boolean;
    onDismiss: (ereason: string) => any;
    onStartNewGame: () => any;
}

const GameOverDialog = (props: GameOverDialogProps) => {
    const [answer, setAnswer] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const revealWord = () => {
        setIsLoading(true);
        WordService.revealWord().then(word => {
            setIsLoading(false);
            setAnswer(word === null ? "" : word);
        });
    };

    return (
        <Dialog onClose={(e, r) => {
            setAnswer("");
            props.onDismiss(r);
        }} open={props.visible} disableEscapeKeyDown={true}>
            <DialogTitle>Game Over!</DialogTitle>
            <DialogContent>
                {isLoading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            marginTop: "-12px",
                            marginLeft: "-12px",
                        }}></CircularProgress>
                )}
                <p>Sorry! You have run out of chances to guess the word!</p>
                {answer !== "" && (<>
                    <div style={{ marginBottom: "10px", fontWeight: "bold" }}>The Wordicle is</div>
                    <Word word={answer} map={Array.from({ length: answer.length }, () => "correct")}></Word>
                </>
                )}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={revealWord} disabled={answer !== "" || isLoading}>Reveal Word</Button>
                <Button variant="contained" onClick={() => {
                    props.onStartNewGame();
                    setAnswer("");
                }} disabled={isLoading}>New Word</Button>
            </DialogActions>
        </Dialog>
    );
};

export default GameOverDialog;