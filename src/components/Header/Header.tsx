import React from "react";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";
import { HeaderWrapper } from "./Header.styles";
import ConfigContext from "../../config/ConfigContext";
import { HeaderProps } from "./Header.types";

const Header = (props: HeaderProps) => {
    const isDarkMode = React.useContext(ConfigContext).darkMode;
    const isHardMode = React.useContext(ConfigContext).chances === 4;

    return (
        <HeaderWrapper isDarkMode={isDarkMode} isNewGameScreen={props.isNewGameScreen}>
            <Tooltip title="Help">
                <IconButton onClick={props.onHelpIconClicked}>
                    <HelpIcon />
                </IconButton>
            </Tooltip>
            <div className="app-title">WORDICLE<span className="tag">[BETA]</span>{isHardMode && <span className="tag hard">[HARD]</span>}</div>
            <Tooltip title="Settings">
                <IconButton onClick={props.onSettingsIconClicked}>
                    <SettingsIcon />
                </IconButton>
            </Tooltip>
        </HeaderWrapper>
    );
};

export default Header;