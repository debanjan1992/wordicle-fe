import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ConfigContext from "../../config/ConfigContext";
import React from "react";

import PlayIcon from "@mui/icons-material/PlayArrow";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import { CircularProgress } from "@mui/material";
import { NewGameProps } from "./NewGame.types";
import { NewGameWrapper } from "./NewGame.styles";

const NewGame = ({
  visible,
  isLoading,
  onStartClick,
  onSettingsClick,
  onRulesClick,
}: NewGameProps) => {
  const isDarkMode = React.useContext(ConfigContext).darkMode;
  return (
    <NewGameWrapper visible={visible} isDarkMode={isDarkMode}>
      <div className={`newgame-bg ${isDarkMode ? "dark" : "light"}`}></div>
      <div
        className={`newgame-bg newgame-bg2 ${isDarkMode ? "dark" : "light"}`}
      ></div>
      <div
        className={`newgame-bg newgame-bg3 ${isDarkMode ? "dark" : "light"}`}
      ></div>
      <div className="app-title">
        <span className="title">Wordicle</span>
      </div>
      <Stack direction="column" spacing={2}>
        <Button
          startIcon={
            isLoading ? (
              <CircularProgress size={22} thickness={6} color="inherit" />
            ) : (
              <PlayIcon />
            )
          }
          variant="contained"
          size="large"
          color="success"
          onClick={onStartClick}
        >
          PLAY
        </Button>
        <Button
          startIcon={<SettingsIcon />}
          variant="contained"
          size="large"
          onClick={onSettingsClick}
        >
          SETTINGS
        </Button>
        <Button
          startIcon={<HelpIcon />}
          variant="contained"
          size="large"
          color="warning"
          onClick={onRulesClick}
        >
          GAME RULES
        </Button>
      </Stack>
    </NewGameWrapper>
  );
};

export default NewGame;
