import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Word from '../GameGrid/Word';
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import React from 'react';
import ConfigContext from '../ConfigContext';

interface HelpDialogProps {
    visible: boolean;
    onDismiss: (reason: string) => any;
}

const DialogContentWrapper = styled.div<{ isDarkMode: boolean }>`
    width: 50vw;
    margin: 0 auto;
    p {
        font-size: 14px;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
            font-weight: 800;
            font-size: 24px;
        }
    }
    .header {
        svg {
            fill: ${props => props.isDarkMode ? "#d7dadc" : "gray"};
        }
    } 
`;

const HelpDialog = (props: HelpDialogProps) => {
    const isDarkMode = React.useContext(ConfigContext).darkMode;

    return (
        <Dialog onClose={(e, r) => props.onDismiss(r)} fullScreen={true} open={props.visible} disableEscapeKeyDown={true}>
            <DialogContent style={{
                backgroundColor: isDarkMode ? "#151515" : "inherit",
                color: isDarkMode ? "#d7dadc" : "black",
                transition: "all 0.4s"
            }}>
                <DialogContentWrapper isDarkMode={isDarkMode}>
                    <div className="header">
                        <div className="title">How to Play</div>
                        <IconButton onClick={() => props.onDismiss("close")} style={{ cursor: "pointer" }}><CloseIcon /></IconButton>
                    </div>
                    <p>Guess the <strong>WORDLE</strong> in 6 tries</p>
                    <p>Each guess must be a valid word. Hit the enter button to submit.</p>
                    <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
                    <hr></hr>
                    <p><strong>Example</strong></p>
                    <div className="example">
                        <Word word="DAIRY" map={["correct"]}></Word>
                        <p>The letter <strong>D</strong> is in the word and in the correct spot.</p>
                    </div>
                    <div className="example">
                        <Word word="PRICE" map={["", "present"]}></Word>
                        <p>The letter <strong>I</strong> is in the wrong spot.</p>
                    </div>
                    <div className="example">
                        <Word word="JOKER" map={["", "", "absent"]}></Word>
                        <p>The letter <strong>K</strong> is not in the word in any spot.</p>
                    </div>
                </DialogContentWrapper>
            </DialogContent>
        </Dialog>
    );
};

export default HelpDialog;