import React, { useEffect, useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import ConfigContext from "../../config/ConfigContext";
import Word from "../../components/GameGrid/Word";
import { TimeParts, WinnerDialogProps } from "./WinnerDialog.types";
import {
  WinnerDialogContentWrapper,
  WinnerDialogButtonsWrapper,
  WinnerDialogueFooterWrapper,
} from "./WinnerDialog.styles";
import Share from "../../components/Share/Share";
import WinStats from "./WinStats";
import { WordService } from "../../services/WordService";
import Confetti from "../../components/Confetti";

const WinnerDialog = (props: WinnerDialogProps) => {
  const context = React.useContext(ConfigContext);
  const words = context.words;
  const wordLength = context.wordLength;
  const wordIdx = context.wordIdx;
  const isDarkMode = context.darkMode;
  const playDuration = context.gameDuration;
  const [totalPlayed, setTotalPlayed] = useState(0);
  const [avgTime, setAvgTime] = useState(0);
  const [bestTimeInMinutes, setBestTimeInMinutes] = useState(context.bestTime);

  const getTime = (timeInSeconds: number) => {
    let timeLeft: TimeParts = { minutes: 0, seconds: 0 };

    if (timeInSeconds > 0) {
      timeLeft = {
        minutes: Math.floor((timeInSeconds / 60) % 60),
        seconds: Math.floor(timeInSeconds % 60),
      };
      return timeLeft;
    } else {
      return null;
    }
  };

  const revealWord = () => {
    WordService.revealWord().then((response) => {
      setBestTimeInMinutes(response.stats.bestTime || 0);
      setTotalPlayed(+response.stats.totalHits);
      setAvgTime(+response.stats.avgTime || 0);
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
        if (r && r === "backdropClick") {
          return;
        }
        props.onDismiss(r);
      }}
      open={props.visible}
      disableEscapeKeyDown={true}
    >
      <WinnerDialogContentWrapper isDarkMode={isDarkMode} id="winner">
        <Confetti
          active={bestTimeInMinutes === 0 || playDuration <= bestTimeInMinutes}
        />
        <DialogContent>
          <div className="header">
            <div className="app-title">
              <span className="title">Wordicle</span>
            </div>
            {/* <div className="title highlight">CONGRATULATIONS</div> */}
          </div>
        </DialogContent>
        <WinStats
          totalHitsForWord={totalPlayed}
          totalChances={context.chances}
          playedChances={wordIdx}
          playTime={getTime(playDuration * 60)}
          bestTime={getTime(bestTimeInMinutes * 60)}
          avgTime={getTime(avgTime * 60)}
        />
        <DialogContent
          sx={{
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <div className="content">
            <img src="assets/congo.png" className="congrats-img" />
            <div style={{ transform: "scale(0.7)", paddingTop: "20px" }}>
              <Word
                word={words[wordIdx - 1]}
                map={Array.from({ length: wordLength }, () => "correct")}
              />
            </div>
          </div>
        </DialogContent>
      </WinnerDialogContentWrapper>
      <WinnerDialogueFooterWrapper isDarkMode={isDarkMode}>
        <Share />
        <WinnerDialogButtonsWrapper isDarkMode={isDarkMode}>
          <Button
            size="large"
            variant="contained"
            onClick={props.goBackToMainMenu}
          >
            Main Menu
          </Button>
        </WinnerDialogButtonsWrapper>
      </WinnerDialogueFooterWrapper>
    </Dialog>
  );
};

export default WinnerDialog;
