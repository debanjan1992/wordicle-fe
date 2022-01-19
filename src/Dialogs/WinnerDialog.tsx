import React from "react";
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Word from '../GameGrid/Word';
import SessionService, { SESSION_KEYS } from '../SessionService';
import ConfigContext from '../ConfigContext';
import ShareIcon from "@mui/icons-material/Share";
import Fab from '@mui/material/Fab';
import ShareButtons from "../ShareButtons";

interface WinnerDialogProps {
    visible: boolean;
    winningWord: string;
    onDismiss: (reason: string) => any;
    onStartNewGame: () => any;
}

const WinnerDialog = (props: WinnerDialogProps) => {
    const endTime = SessionService.getFromSession(SESSION_KEYS.EndTime);
    const startTime = SessionService.getFromSession(SESSION_KEYS.StartTime);
    const chances = SessionService.getFromSession(SESSION_KEYS.WordIndex);
    const totalChances = React.useContext(ConfigContext).chances;

    let timeTaken = 0;
    if (startTime !== null && endTime !== null) {
        timeTaken = (endTime - startTime) / 1000;
    }

    const getTime = (time: number) => {
        if (time < 60) {
            return `${Math.floor(time)} seconds`
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

    const getShareText = () => {
        const mapping = SessionService.getFromSession(SESSION_KEYS.Mapping);
        let codeSnap = ``;
        if (mapping !== null) {
            mapping.forEach((codes: string[]) => {
                let wordCode = "";
                codes.forEach(code => {
                    if (code === "correct") {
                        wordCode = wordCode + "🟩";
                    } else if (code === "present") {
                        wordCode = wordCode + "🟧";
                    } else if (code === "absent") {
                        wordCode = wordCode + "🟥";
                    }
                });
                if (wordCode !== "") {
                    codeSnap = codeSnap + wordCode + "\n";
                }
            });
        }
        const text = `
I have successfully guessed the WORDICLE - ${props.winningWord} in ${getTime(timeTaken)} and in ${chances}/${totalChances} tries.

${codeSnap}

Play WORDICLE now on https://debanjan1992.github.io/wordicle-fe/

#wordicle
        `;
        return text;
    };

    return (
        <Dialog onClose={(e, r) => props.onDismiss(r)} open={props.visible} disableEscapeKeyDown={true}>
            <DialogContent>
                <div className="header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
                    <div className="title" style={{ fontSize: "24px" }}><strong>Congratulations</strong></div>
                </div>
                {timeTaken && <p>You have guessed the word correctly in <strong>{getTime(timeTaken)}</strong> and in <strong>{chances}/{totalChances}</strong> chances</p>}
                {!timeTaken && <p>You have guessed the word correctly</p>}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Word word={props.winningWord} map={Array.from({ length: props.winningWord?.length }, () => "correct")}></Word>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
                    <ShareButtons url=""
                        title={getShareText()}></ShareButtons>
                </div>
            </DialogContent>
            <DialogActions sx={{ marginTop: "20px" }}>
                <Button size="small" variant="contained" onClick={props.onStartNewGame}>Start a New Game</Button>
            </DialogActions>
        </Dialog>
    );
};

export default WinnerDialog;