import React from "react";
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import SessionService, { SESSION_KEYS } from '../SessionService';
import ConfigContext from '../ConfigContext';
import styled from "styled-components";
import WhatsappIcon from "@mui/icons-material/Whatsapp";
import CopyIcon from "@mui/icons-material/CopyAll";
import Snackbar from "@mui/material/Snackbar";
import Word from "../GameGrid/Word";

interface WinnerDialogProps {
    visible: boolean;
    onDismiss: (reason: string) => any;
    onStartNewGame: () => any;
}

const DialogContentWrapper = styled.div<{ isDarkMode: boolean; }>`
    background-color: ${props => props.isDarkMode ? "#131313" : "white"};
    color: ${props => props.isDarkMode ? "#d7dadc" : "black"};
    transition: all 0.4s;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;

        .title {
            font-size: 26px;
            color: #50df50;
            font-weight: bolder;
        }
    }

    .content {
        display: flex;
        align-items: center;
    }
`;

const WinnerDialog = (props: WinnerDialogProps) => {
    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const endTime = SessionService.getFromSession(SESSION_KEYS.EndTime);
    const startTime = SessionService.getFromSession(SESSION_KEYS.StartTime);
    const chances = SessionService.getFromSession(SESSION_KEYS.WordIndex);
    const totalChances = React.useContext(ConfigContext).chances;
    const words = SessionService.getFromSession(SESSION_KEYS.Words) || [];
    const wordLength = SessionService.getFromSession(SESSION_KEYS.WordLength) || 0;
    const wordIdx = SessionService.getFromSession(SESSION_KEYS.WordIndex) || 0;
    const isDarkMode = React.useContext(ConfigContext).darkMode;

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
Play WORDICLE now on https://debanjan1992.github.io/wordicle-fe/`;
        return text;
    };

    const onShare = (medium: string) => {
        const shareText = getShareText();
        if (medium === "whatsapp") {
            window.open("whatsapp://send?text=Your message here" + encodeURI(shareText), "_target");
        } else if (medium === "copy") {
            if (window.isSecureContext && window.navigator.clipboard) {
                window.navigator.clipboard.writeText(shareText);
                setShowSnackbar(true);
            } else {
                alert(shareText);
            }
        }
    };

    return (
        <Dialog onClose={(e, r) => props.onDismiss(r)} open={props.visible} disableEscapeKeyDown={true}>
            <DialogContentWrapper isDarkMode={isDarkMode}>
                <DialogContent>
                    <div className="header">
                        <div className="title">CONGRATULATIONS</div>
                    </div>
                    {timeTaken && <p>You have guessed the word correctly in <strong>{getTime(timeTaken)}</strong> and in <strong>{chances}/{totalChances}</strong> chances</p>}
                    <div className="content">
                        <div style={{ flex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Word wordLength={wordLength} word={words[wordIdx - 1]} map={Array.from({ length: wordLength }, () => "correct")} />
                            <Button variant="contained" color="success" size="small" sx={{ marginTop: "12px", marginBottom: "5px", width: "100%", maxWidth: "250px" }} onClick={() => onShare("whatsapp")}>
                                <WhatsappIcon sx={{ color: "white", marginRight: "5px" }}></WhatsappIcon>Share on Whatsapp</Button>
                            <Button variant="contained" size="small" sx={{ width: "100%", maxWidth: "250px", marginBottom: "20px" }} onClick={() => onShare("copy")}>
                                <CopyIcon sx={{ color: "white", marginRight: "5px" }}></CopyIcon>Copy</Button>
                            <Button size="small" color="error" variant="contained" onClick={props.onStartNewGame} sx={{ width: "100%", maxWidth: "250px" }}>New Game</Button>
                        </div>
                        {/* <div style={{ flex: 1.5, paddingLeft: "10px" }}>

                        </div> */}
                    </div>
                </DialogContent>
                <Snackbar
                    open={showSnackbar}
                    autoHideDuration={3000}
                    message="Copied to clipboard."
                    onClose={() => setShowSnackbar(false)}
                />
            </DialogContentWrapper>
        </Dialog>
    );
};

export default WinnerDialog;