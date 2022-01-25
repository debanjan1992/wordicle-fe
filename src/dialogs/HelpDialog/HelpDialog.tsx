import React from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Word from "../../components/GameGrid/Word";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ConfigContext from "../../config/ConfigContext";
import { HelpDialogProps } from "./HelpDialog.types";
import { HelpDialogContentWrapper } from "./HelpDialog.styles";

const HelpDialog = (props: HelpDialogProps) => {
  const isDarkMode = React.useContext(ConfigContext).darkMode;

  return (
    <Dialog
      onClose={(e, r) => props.onDismiss(r)}
      fullScreen={false}
      open={props.visible}
      disableEscapeKeyDown={true}
    >
      <DialogContent
        style={{
          backgroundColor: isDarkMode ? "#151515" : "inherit",
          color: isDarkMode ? "#d7dadc" : "black",
          transition: "all 0.4s",
        }}
      >
        <HelpDialogContentWrapper isDarkMode={isDarkMode}>
          <div className="header">
            <div className="title">How to Play</div>
            <IconButton
              onClick={() => props.onDismiss("close")}
              style={{ cursor: "pointer" }}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <p>
            Guess the <strong>WORDICLE</strong> in 6 tries
          </p>
          <p>
            Each guess must be a valid word. Click the enter button to submit.
          </p>
          <p>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </p>
          <hr></hr>
          <p>
            <strong>Example</strong>
          </p>
          <div className="example">
            <Word word="DAIRY" map={["correct"]}></Word>
            <p>
              The letter <strong>D</strong> is in the word and in the correct
              spot.
            </p>
          </div>
          <div className="example">
            <Word word="PRICE" map={["", "", "present"]}></Word>
            <p>
              The letter <strong>I</strong> is in the wrong spot.
            </p>
          </div>
          <div className="example">
            <Word word="JOKER" map={["", "", "absent"]}></Word>
            <p>
              The letter <strong>K</strong> is not in the word in any spot.
            </p>
          </div>
        </HelpDialogContentWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
