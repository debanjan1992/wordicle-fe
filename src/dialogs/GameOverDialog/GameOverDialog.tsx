import React, { useEffect } from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { WordService } from "../../services/WordService";
import Word from "../../components/GameGrid/Word";
import { useState } from "react";
import ConfigContext from "../../config/ConfigContext";
import { GameOverDialogProps } from "./GameOverDialog.types";
import { GameOverDialogContentWrapper } from "./GameOverDialog.styles";

const GameOverDialog = (props: GameOverDialogProps) => {
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isDarkMode = React.useContext(ConfigContext).darkMode;

  const revealWord = () => {
    setIsLoading(true);
    WordService.revealWord().then((response) => {
      setIsLoading(false);
      setAnswer(response.data === null ? "" : response.data);
    });
  };

  useEffect(() => {
    if (props.visible) {
      revealWord();
    }
  }, [props.visible]);

  return (
    <Dialog
      onClose={(e, r) => {
        if (r && r == "backdropClick") {
          return;
        }
        setAnswer("");
        props.onDismiss(r);
      }}
      open={props.visible}
      disableEscapeKeyDown={true}
      sx={{ backgroundColor: "transparent" }}
    >
      <GameOverDialogContentWrapper isDarkMode={isDarkMode}>
        <DialogContent>
          <div className="header">
            <div className="title">
              <strong>GAME OVER</strong>
            </div>
            <Button
              variant="contained"
              onClick={() => {
                props.onMainMenuClick();
                setAnswer("");
              }}
              disabled={isLoading}
            >
              Main Menu
            </Button>
          </div>
          <p style={{ marginBottom: "15px" }}>
            Sorry! You have run out of chances to guess the word!
          </p>
          {answer !== "" && (
            <>
              <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
                The Wordicle is
              </div>
              <Word
                word={answer}
                map={Array.from({ length: answer.length }, () => "correct")}
              ></Word>
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
            }}
          ></CircularProgress>
        )}
      </GameOverDialogContentWrapper>
    </Dialog>
  );
};

export default GameOverDialog;
