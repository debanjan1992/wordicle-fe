import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Word from '../GameGrid/Word';
import SessionService, { SESSION_KEYS } from '../SessionService';
import ConfigContext from '../ConfigContext';
import React from 'react';

interface WinnerDialogProps {
    visible: boolean;
    winningWord: string;
    onDismiss: (ereason: string) => any;
    onStartNewGame: () => any;
}

const WinnerDialog = (props: WinnerDialogProps) => {
    const endTime = SessionService.getFromSession(SESSION_KEYS.EndTime);
    const startTime = SessionService.getFromSession(SESSION_KEYS.StartTime);
    const chances = SessionService.getFromSession(SESSION_KEYS.WordIndex) + 1;
    const totalChances = React.useContext(ConfigContext).chances;

    let timeTaken: number = 0;
    if (startTime !== null && endTime !== null) {
        timeTaken = (endTime - startTime) / 1000;
    }

    const getTime = (time: number) => {
        if (time < 60) {
            return `${time} seconds`
        } else {
            const minutes = time / 60;
            const seconds = time % 60;
            if (Math.floor(minutes) === 1) {
                return `${Math.floor(minutes)} minute and ${Math.floor(seconds)} seconds`;
            } else {
                return `${Math.floor(minutes)} minutes and ${Math.floor(seconds)} seconds`;
            }

        }
    };

    return (
        <Dialog onClose={(e, r) => props.onDismiss(r)} open={props.visible} disableEscapeKeyDown={true}>
            <DialogContent>
                <div className="header">
                    <div className="title" style={{ fontSize: "24px" }}><strong>Congratulations</strong></div>
                </div>
                {timeTaken && <p>You have guessed the word correctly in <strong>{getTime(timeTaken)}</strong> and in <strong>{chances}/{totalChances}</strong> chances</p>}
                {!timeTaken && <p>You have guessed the word correctly</p>}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Word word={props.winningWord} map={Array.from({ length: props.winningWord?.length }, () => "correct")}></Word>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={props.onStartNewGame}>Start a New Game</Button>
            </DialogActions>
        </Dialog>
    );
};

export default WinnerDialog;