import styled from "styled-components";
import Button from "@mui/material/Button";
import ConfigContext from "./ConfigContext";
import React from "react";

import PlayIcon from "@mui/icons-material/PlayArrow";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";

interface NewGameProps {
  visible: boolean;
  onStartClick: () => any;
  onSettingsClick: () => any;
  onRulesClick: () => any;
}

const NewGameWrapper = styled.div<{ visible: boolean; isDarkMode: boolean }>`
  display: flex;
  position: absolute;
  top: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  transition: all 0.8s;
  background: ${(props) => (props.isDarkMode ? "black" : "white")};
  width: 100%;
  transform: ${(props) =>
    props.visible ? "translateY(0%)" : "translateY(100%)"};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  z-index: 100;
  button {
    margin-bottom: 10px;
    width: 200px;
  }
  .app-title {
    font-size: 40px;
    color: ${(props) => (props.isDarkMode ? "#d7dadc" : "black")};
    margin-bottom: 30px;
    font-weight: bolder;
    .tag {
      font-size: 10px;
      letter-spacing: 0;
    }
  }
`;

const NewGame = ({
  visible,
  onStartClick,
  onSettingsClick,
  onRulesClick,
}: NewGameProps) => {
  const isDarkMode = React.useContext(ConfigContext).darkMode;
  return (
    <NewGameWrapper visible={visible} isDarkMode={isDarkMode}>
      <div className="app-title">
        WORDICLE<span className="tag">[BETA]</span>
      </div>
      <Button variant="contained" color="success" onClick={onStartClick}>
        PLAY
      </Button>
      <Button variant="contained" onClick={onSettingsClick}>
        SETTINGS
      </Button>
      <Button variant="contained" onClick={onRulesClick}>
        GAME RULES
      </Button>
    </NewGameWrapper>
  );
};

export default NewGame;
