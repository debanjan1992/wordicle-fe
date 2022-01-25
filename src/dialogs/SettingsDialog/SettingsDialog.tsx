import React from "react";
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Switch from '@mui/material/Switch';
import ConfigContext from '../../config/ConfigContext';
import { SettingsDialogProps } from "./SettingsDialog.types";
import { SettingsDialogContentWrapper } from "./SettingsDialog.styles";

const SettingsDialog = (props: SettingsDialogProps) => {
    const config = React.useContext(ConfigContext);

    return (
        <Dialog onClose={(e, r) => props.onDismiss(r)} fullScreen={true} open={props.visible} disableEscapeKeyDown={true}>
            <DialogContent style={{ backgroundColor: config.darkMode ? "#151515" : "inherit", color: config.darkMode ? "#d7dadc" : "black", transition: "all 0.4s" }}>
                <SettingsDialogContentWrapper darkMode={config.darkMode}>
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
                    </List>
                </SettingsDialogContentWrapper>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsDialog;