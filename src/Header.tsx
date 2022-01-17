import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from "@mui/icons-material/Settings";
import { HeaderWrapper } from "./Wordle.styles";
import React from "react";
import ConfigContext from "./ConfigContext";

interface HeaderProps {
    onHelpIconClicked: () => any;
    onSettingsIconClicked: () => any;
}

const Header = (props: HeaderProps) => {
    const isDarkMode = React.useContext(ConfigContext).darkMode;
    const isHardMode = React.useContext(ConfigContext).chances === 4;

    return (
        <HeaderWrapper isDarkMode={isDarkMode}>
            <Tooltip title="Help">
                <IconButton onClick={props.onHelpIconClicked}>
                    <HelpIcon />
                </IconButton>
            </Tooltip>
            <div className="app-title">WORDICLE{isHardMode && <span className="tag">[HARD]</span>}</div>
            <Tooltip title="Settings">
                <IconButton onClick={props.onSettingsIconClicked}>
                    <SettingsIcon />
                </IconButton>
            </Tooltip>
        </HeaderWrapper>
    );
};

export default Header;