import React from "react";
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import SessionService, { SESSION_KEYS } from '../SessionService';
import ConfigContext from '../ConfigContext';
import ShareButtons from "../ShareButtons";
import GameGrid from "../GameGrid/GameGrid";

interface WinnerDialogProps {
    visible: boolean;
    onDismiss: (reason: string) => any;
    onStartNewGame: () => any;
}

const WinnerDialog = (props: WinnerDialogProps) => {
    const endTime = SessionService.getFromSession(SESSION_KEYS.EndTime);
    const startTime = SessionService.getFromSession(SESSION_KEYS.StartTime);
    const chances = SessionService.getFromSession(SESSION_KEYS.WordIndex);
    const totalChances = React.useContext(ConfigContext).chances;
    const words = SessionService.getFromSession(SESSION_KEYS.Words) || [];
    const colorMap = SessionService.getFromSession(SESSION_KEYS.Mapping) || [];
    const wordLength = SessionService.getFromSession(SESSION_KEYS.WordLength) || 0;
    const wordIdx = SessionService.getFromSession(SESSION_KEYS.WordIndex) || 0;

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
I have successfully guessed the WORDICLE - ${words[wordIdx === 0 ? wordIdx : wordIdx - 1]} in ${getTime(timeTaken)} and in ${chances}/${totalChances} tries.

${codeSnap}

#wordicle
Play WORDICLE now on`;
        return text;
    };

    return (
        <Dialog onClose={(e, r) => props.onDismiss(r)} open={props.visible} disableEscapeKeyDown={true}>
            <DialogContent>
                <div className="header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
                    <div className="title" style={{ fontSize: "24px" }}><strong>Congratulations</strong></div>
                    <Button size="small" variant="contained" onClick={props.onStartNewGame}>New Game</Button>
                </div>
                {timeTaken && <p>You have guessed the word correctly in <strong>{getTime(timeTaken)}</strong> and in <strong>{chances}/{totalChances}</strong> chances</p>}
                {!timeTaken && <p>You have guessed the word correctly</p>}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <GameGrid wordLength={wordLength} words={words} map={colorMap} dontShowEmpty={true} />
                    {/* <Word word={props.winningWord} map={Array.from({ length: props.winningWord?.length }, () => "correct")}></Word> */}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "20px" }}>
                    <ShareButtons url="https://debanjan1992.github.io/wordicle-fe/"
                        title={getShareText()}></ShareButtons>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WinnerDialog;