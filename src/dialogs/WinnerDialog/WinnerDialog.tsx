import React from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import ConfigContext from "../../config/ConfigContext";
import Word from "../../components/GameGrid/Word";
import { WinnerDialogProps } from "./WinnerDialog.types";
import {
  WinnerDialogContentWrapper,
  WinnerDialogButtonsWrapper,
} from "./WinnerDialog.styles";
import Share from "../../components/Share/Share";
import WinStats from "./WinStats";

const WinnerDialog = (props: WinnerDialogProps) => {
  const context = React.useContext(ConfigContext);
  const words = context.words;
  const wordLength = context.wordLength;
  const wordIdx = context.wordIdx;
  const isDarkMode = context.darkMode;

  return (
    <Dialog
      onClose={(e, r) => props.onDismiss(r)}
      open={props.visible}
      disableEscapeKeyDown={true}
    >
      <WinnerDialogContentWrapper isDarkMode={isDarkMode}>
        <div className="pyro-container">
          <div className="pyro">
            <div className="before"></div>
            <div className="after"></div>
          </div>
        </div>
        <DialogContent>
          <div className="header">
            <div className="title">CONGRATULATIONS</div>
          </div>
          <div className="content">
            {props.visible && <WinStats />}
            <Word
              word={words[wordIdx - 1]}
              map={Array.from({ length: wordLength }, () => "correct")}
            />
            <Share />
            <WinnerDialogButtonsWrapper isDarkMode={isDarkMode}>
              <Button variant="contained" onClick={props.goBackToMainMenu}>
                Main Menu
              </Button>
            </WinnerDialogButtonsWrapper>
          </div>
        </DialogContent>
      </WinnerDialogContentWrapper>
    </Dialog>
  );
};

export default WinnerDialog;
