import React, { useEffect, useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import ConfigContext from "../../config/ConfigContext";
import ShareIcon from "@mui/icons-material/Share";
import WhatsappIcon from "@mui/icons-material/Whatsapp";
import IconButton from "@mui/material/IconButton";
import CopyIcon from "@mui/icons-material/CopyAll";
import Snackbar from "@mui/material/Snackbar";
import Word from "../../components/GameGrid/Word";
import { WordService } from "../../services/WordService";
import Tooltip from "@mui/material/Tooltip";
import { WinnerDialogProps } from "./WinnerDialog.types";
import { WinnerDialogContentWrapper, WinnerDialogButtonsWrapper } from "./WinnerDialog.styles";


const WinnerDialog = (props: WinnerDialogProps) => {
  const context = React.useContext(ConfigContext);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const gameDurationInMinutes = context.gameDuration;
  const [bestTimeInMinutes, setBestTimeInMinutes] = useState(context.bestTime);
  const [totalPlayed, setTotalPlayed] = useState(0);
  const chances = context.wordIdx;
  const totalChances = context.chances;
  const words = context.words;
  const wordLength = context.wordLength;
  const wordIdx = context.wordIdx;
  const isDarkMode = context.darkMode;

  const getTimeInString = (timeInSeconds: number) => {
    const days = Math.floor(timeInSeconds / (60 * 60 * 24));
    const hours = Math.floor((timeInSeconds / (60 * 60)) % 24);
    const minutes = Math.floor((timeInSeconds / 60) % 60);
    const seconds = Math.floor(timeInSeconds % 60);
    let result = "";
    if (days > 0) {
      result = result + days + " days ";
    }
    if (hours > 0) {
      result = result + hours + " hours ";
    }
    if (minutes) {
      result = result + minutes + " minutes ";
    }
    if (seconds) {
      result = result + seconds + " seconds";
    }
    return result;
  };

  const getTime = (timeInSeconds: number) => {
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (timeInSeconds > 0) {
      timeLeft = {
        days: Math.floor(timeInSeconds / (60 * 60 * 24)),
        hours: Math.floor((timeInSeconds / (60 * 60)) % 24),
        minutes: Math.floor((timeInSeconds / 60) % 60),
        seconds: Math.floor(timeInSeconds % 60),
      };
    }

    return timeLeft;
  };

  const getShareText = () => {
    const mapping = context.mapping;
    let codeSnap = ``;
    if (mapping !== null) {
      mapping.forEach((codes: string[]) => {
        let wordCode = "";
        codes.forEach((code) => {
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
I have successfully guessed the WORDICLE - ${
      words[wordIdx === 0 ? wordIdx : wordIdx - 1]
    } in ${getTimeInString(
      gameDurationInMinutes * 60
    )} and in ${chances}/${totalChances} tries.

${codeSnap}

#wordicle
Play WORDICLE now on https://debanjan1992.github.io/wordicle-fe/`;
    return text;
  };

  const onShare = (medium: string) => {
    const shareText = getShareText();
    if (medium === "whatsapp") {
      window.open(
        "whatsapp://send?text=" + encodeURIComponent(shareText),
        "_target"
      );
    } else if (medium === "share") {
      if (window.isSecureContext && window.navigator.share) {
        window.navigator.share({
          text: getShareText(),
          title: "WORDICLE",
          url: "https://debanjan1992.github.io/wordicle-fe/",
        });
      }
    } else if (medium === "copy") {
      if (window.isSecureContext && window.navigator.clipboard) {
        window.navigator.clipboard.writeText(shareText);
        setShowSnackbar(true);
      } else {
        alert(shareText);
      }
    }
  };

  const timeTaken = getTime(gameDurationInMinutes * 60);
  const fastestTimeTaken = getTime(bestTimeInMinutes === "NA" ? 0 : (+bestTimeInMinutes * 60));

  const revealWord = () => {
    WordService.revealWord().then((response) => {
      setBestTimeInMinutes(response.stats.bestTime);
      setTotalPlayed(+response.stats.totalHits);
    });
  };

  useEffect(() => {
    if (props.visible) {
      revealWord();
    }
  }, [props.visible]);

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
            <div className="stats">
              <div className="winner-stat">
                <label>Time taken</label>
                <div className="stat-value">
                  {timeTaken.days !== 0 && (
                    <span className="days">{timeTaken.days + "d"}</span>
                  )}
                  {timeTaken.hours !== 0 && (
                    <span className="hours">{timeTaken.hours + "h"}</span>
                  )}
                  <span className="minutes">{timeTaken.minutes + "m"}</span>
                  <span className="seconds">{timeTaken.seconds + "s"}</span>
                </div>
              </div>
              <div className="divider"></div>
              <div className="winner-stat">
                <label>Chances</label>
                <div className="stat-value">
                  {chances}/{totalChances}
                </div>
              </div>
              <div className="divider"></div>
              <div className="winner-stat">
                <Tooltip title="This is the fastest time in which this word has been solved">
                  <label>Best time</label>
                </Tooltip>
                <div className="stat-value">
                  <>
                    {fastestTimeTaken.days !== 0 && (
                      <span className="days">
                        {fastestTimeTaken.days + "d"}
                      </span>
                    )}
                    {fastestTimeTaken.hours !== 0 && (
                      <span className="hours">
                        {fastestTimeTaken.hours + "h"}
                      </span>
                    )}
                    <span className="minutes">
                      {fastestTimeTaken.minutes + "m"}
                    </span>
                    <span className="seconds">
                      {fastestTimeTaken.seconds + "s"}
                    </span>
                  </>
                </div>
              </div>
            </div>
            <Word
              wordLength={wordLength}
              word={words[wordIdx - 1]}
              map={Array.from({ length: wordLength }, () => "correct")}
              badgeCount={totalPlayed}
            />
            <div className="share-section">
              <div className="heading">SHARE</div>
              <div className="sharing-buttons">
                <Tooltip title="Share on whatsapp">
                  <IconButton
                    color="success"
                    onClick={() => onShare("whatsapp")}
                  >
                    <WhatsappIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share">
                  <IconButton color="secondary" onClick={() => onShare("share")}>
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copy">
                  <IconButton color="error" onClick={() => onShare("copy")}>
                    <CopyIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <WinnerDialogButtonsWrapper isDarkMode={isDarkMode}>
              <Button
                variant="contained"
                onClick={props.goBackToMainMenu}
              >
                Main Menu
              </Button>
            </WinnerDialogButtonsWrapper>
          </div>
        </DialogContent>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          message="Copied to clipboard."
          onClose={() => setShowSnackbar(false)}
        />
      </WinnerDialogContentWrapper>
    </Dialog>
  );
};

export default WinnerDialog;
