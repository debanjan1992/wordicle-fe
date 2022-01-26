import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import ConfigContext from "../../config/ConfigContext";
import ShareIcon from "@mui/icons-material/Share";
import CopyIcon from "@mui/icons-material/CopyAllRounded";
import WhatsappIcon from "@mui/icons-material/WhatsappRounded";
import { ShareWrapper } from "./Share.styles";
import Snackbar from "@mui/material/Snackbar";

const Share = () => {
  const context = React.useContext(ConfigContext);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const words = context.words;
  const wordIdx = context.wordIdx;
  const chances = context.wordIdx;
  const totalChances = context.chances;
  const mapping = context.mapping;
  const gameDurationInMinutes = context.gameDuration;

  const getShareText = () => {
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

  return (
    <ShareWrapper>
      <div className="heading">SHARE</div>
      <div className="sharing-buttons">
        <Tooltip title="Share on whatsapp">
          <IconButton color="success" onClick={() => onShare("whatsapp")}>
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
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        message="Copied to clipboard."
        onClose={() => setShowSnackbar(false)}
      />
    </ShareWrapper>
  );
};

export default Share;
