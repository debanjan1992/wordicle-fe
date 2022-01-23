import React, { useEffect } from "react";
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { WordService } from '../WordService';
import Word from "../GameGrid/Word";
import { useState } from "react";
import ConfigContext from "../ConfigContext";
import styled from "styled-components";

interface GameOverDialogProps {
    visible: boolean;
    onDismiss: (reason: string) => any;
    onMainMenuClick: () => any;
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
            font-size: 24px;
            color: crimson;
            font-weight: bolder;
        }
    }
`;

const GameOverDialog = (props: GameOverDialogProps) => {
    const [answer, setAnswer] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const isDarkMode = React.useContext(ConfigContext).darkMode;

    const revealWord = () => {
        setIsLoading(true);
        WordService.revealWord().then(response => {
            setIsLoading(false);
            setAnswer(response.data === null ? "" : response.data);
        });
    };

    useEffect(() => {
        if (props.visible) {
            revealWord();
        }
    }, [props.visible])

    return (
        <Dialog onClose={(e, r) => {
            setAnswer("");
            props.onDismiss(r);
        }} open={props.visible} disableEscapeKeyDown={true} sx={{ backgroundColor: "transparent"}}>
            <DialogContentWrapper isDarkMode={isDarkMode}>
                <DialogContent>
                    <div className="header">
                        <div className="title"><strong>GAME OVER</strong></div>
                        <Button variant="contained" onClick={() => {
                            props.onMainMenuClick();
                            setAnswer("");
                        }} disabled={isLoading}>Main Menu</Button>
                    </div>
                    <p style={{ marginBottom: "15px" }}>Sorry! You have run out of chances to guess the word!</p>
                    {answer !== "" && (<>
                        <div style={{ marginBottom: "10px", fontWeight: "bold" }}>The Wordicle is</div>
                        <Word word={answer} map={Array.from({ length: answer.length }, () => "correct")}></Word>
                    </>
                    )}
                </DialogContent>
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
            </DialogContentWrapper>
        </Dialog>
    );
};

export default GameOverDialog;