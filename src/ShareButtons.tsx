import React from "react";
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappShareButton,
    WhatsappIcon
} from 'react-share';
import Fab from "@mui/material/Fab";
import CopyIcon from "@mui/icons-material/CopyAll";
import Snackbar from "@mui/material/Snackbar";

interface ShareButtonsProps {
    url: string;
    title: string;
}

const ShareButtons = ({ url, title }: ShareButtonsProps) => {
    const [showSnackbar, setShowSnackbar] = React.useState(false);

    return (
        <div style={{ display: "flex", alignItems: "center"}}>
            <strong style={{ marginRight: "10px" }}>Share on {"   "}</strong>
            <FacebookShareButton url={url} style={{ marginRight: "10px" }}>
                <FacebookIcon size={40} round={true} />
            </FacebookShareButton>

            <LinkedinShareButton url={url} style={{ marginRight: "10px" }}>
                <LinkedinIcon size={40} round={true} />
            </LinkedinShareButton>

            <WhatsappShareButton url={url} title={title} style={{ marginRight: "10px" }}>
                <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>

            <Fab color="primary" size="small" sx={{ position: "relative", top: "-3px"}} onClick={() => {
                if (window.isSecureContext && window.navigator.clipboard) {
                    window.navigator.clipboard.writeText(title);
                } else {
                    alert(title);
                }
                setShowSnackbar(true);
            }}>
                <CopyIcon />
            </Fab>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={3000}
                message="Copied to clipboard."
                onClose={() => setShowSnackbar(false)}
            />
        </div>
    );
};

export default ShareButtons;