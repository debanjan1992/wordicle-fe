import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HardModeIcon from "@mui/icons-material/Extension";
import Switch from '@mui/material/Switch';
import ConfigContext from '../ConfigContext';
import React from 'react';

interface SettingsDialogProps {
    visible: boolean;
    onToggleDarkMode: (darkMode: boolean) => any;
    onToggleHardMode: (hardMode: boolean) => any;
    onDismiss: (reason: string) => any;
}

export const DialogContentWrapper = styled.div<{ darkMode?: boolean }>`
    width: 50vw;
    margin: 0 auto;
    color: ${props => props.darkMode ? "#d7dadc" : "black"};
    p {
        font-size: 14px;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
            font-weight: 800;
            font-size: 24px;
        }
    }
    svg {
        fill: ${props => props.darkMode ? "#d7dadc" : "gray"};
    }
`;

const SettingsDialog = (props: SettingsDialogProps) => {
    const config = React.useContext(ConfigContext);

    return (
        <Dialog onClose={(e, r) => props.onDismiss(r)} fullScreen={true} open={props.visible} disableEscapeKeyDown={true}>
            <DialogContent style={{ backgroundColor: config.darkMode ? "#151515" : "inherit", color: config.darkMode ? "#d7dadc" : "black", transition: "all 0.4s" }}>
                <DialogContentWrapper darkMode={config.darkMode}>
                    <div className="header">
                        <div className="title">Settings</div>
                        <IconButton onClick={() => props.onDismiss("close")} style={{ cursor: "pointer" }}><CloseIcon /></IconButton>
                    </div>
                    <List>
                        <ListItem>
                            <ListItemIcon>
                                <DarkModeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dark Mode" />
                            <Switch checked={config.darkMode}
                                onChange={e => props.onToggleDarkMode(e.target.checked)} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <HardModeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Hard Mode"
                                secondary={<span style={{
                                    color: config.darkMode ? "#6b6b6b" : "black"
                                }}>With Hard Mode enabled, you will get only 4 chances to guess the word. This will also restart the game. </span>} />
                            <Switch checked={config.chances === 4}
                                onChange={e => props.onToggleHardMode(e.target.checked)} />
                        </ListItem>
                    </List>
                </DialogContentWrapper>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsDialog;