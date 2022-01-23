import React, { useEffect, useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import SessionService, { SESSION_KEYS } from "../SessionService";
import ConfigContext from "../ConfigContext";
import styled from "styled-components";
import WhatsappIcon from "@mui/icons-material/Whatsapp";
import CopyIcon from "@mui/icons-material/CopyAll";
import Snackbar from "@mui/material/Snackbar";
import Word from "../GameGrid/Word";
import { WordService } from "../WordService";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

interface WinnerDialogProps {
  visible: boolean;
  onDismiss: (reason: string) => any;
  goBackToMainMenu: () => any;
}

const DialogButtonsWrapper = styled.div<{ isDarkMode: boolean }>`
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 20px;
  button {
    margin: 0 10px;
  }
  border-top: 1px solid transparent;
  border-color: ${(props) => (props.isDarkMode ? "#272727" : "#e4e4e4")};

  /* For Mobile Portrait View */
  @media screen and (max-device-width: 480px) and (orientation: portrait) {
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    button {
      margin: 5px 0px;
    }
  }

  @media screen and (max-width: 560px) {
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    button {
      margin: 5px 0px;
    }
  }
`;

const DialogContentWrapper = styled.div<{ isDarkMode: boolean }>`
  background-color: ${(props) => (props.isDarkMode ? "#131313" : "white")};
  color: ${(props) => (props.isDarkMode ? "#d7dadc" : "black")};
  transition: all 0.4s;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;

    .title {
      font-size: 26px;
      color: #50df50;
      font-weight: bolder;
    }
  }

  .content {
    .stats {
      display: flex;
      align-items: stretch;
      justify-content: space-between;
      user-select: none;
      margin-bottom: 40px;

      .divider {
        width: 1px;
        background-color: ${(props) =>
          props.isDarkMode ? "#272727" : "#e4e4e4"};
      }

      .winner-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        flex-shrink: 0;

        label {
          font-size: 11px;
        }
        .stat-value {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
`;

const WinnerDialog = (props: WinnerDialogProps) => {
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const gameDurationInMinutes = +(
    SessionService.getFromSession(SESSION_KEYS.GameDuration) || 0
  );
  const [bestTimeInMinutes, setBestTimeInMinutes] = useState(
    () => SessionService.getFromSession(SESSION_KEYS.BestTime) || 0
  );
  const [totalPlayed, setTotalPlayed] = useState(0);
  const chances = SessionService.getFromSession(SESSION_KEYS.WordIndex);
  const totalChances = React.useContext(ConfigContext).chances;
  const words = SessionService.getFromSession(SESSION_KEYS.Words) || [];
  const wordLength =
    SessionService.getFromSession(SESSION_KEYS.WordLength) || 0;
  const wordIdx = SessionService.getFromSession(SESSION_KEYS.WordIndex) || 0;
  const isDarkMode = React.useContext(ConfigContext).darkMode;

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
    const mapping = SessionService.getFromSession(SESSION_KEYS.Mapping);
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
    } in ${getTime(
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
        "whatsapp://send?text=Your message here" + encodeURI(shareText),
        "_target"
      );
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
  const fastestTimeTaken = getTime(bestTimeInMinutes * 60);

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

  console.log("Total Played", totalPlayed);

  return (
    <Dialog
      onClose={(e, r) => props.onDismiss(r)}
      open={props.visible}
      disableEscapeKeyDown={true}
    >
      <DialogContentWrapper isDarkMode={isDarkMode}>
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
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
            <DialogButtonsWrapper isDarkMode={isDarkMode}>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => onShare("whatsapp")}
              >
                <WhatsappIcon
                  sx={{ color: "white", marginRight: "5px" }}
                ></WhatsappIcon>
                Share on Whatsapp
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={() => onShare("copy")}
              >
                <CopyIcon
                  sx={{ color: "white", marginRight: "5px" }}
                ></CopyIcon>
                Copy
              </Button>
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={props.goBackToMainMenu}
              >
                Main Menu
              </Button>
            </DialogButtonsWrapper>
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
