import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';

import {
    Button,
    IconButton,
} from "@mui/material";
import { useState } from "react";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';

export default function StartTimerPopUp({auth,Id}) {
    const [open, setOpen] = useState(true);
    const [start_time, setStart_time] = useState('');

    const handleClose = () =>{
        setStart_time('');
        setOpen(false);
    }
    const currentTime = new Date().toLocaleTimeString();
    const handleStartTimer = () =>{
        setStart_time(currentTime);
    }
    console.log(auth,Id,"currentTime")
    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" maxWidth={"md"} aria-describedby="alert-dialog-slide-description">
                <DialogTitle className="bg-[#0AA283] text-center text-white" padding={"3px 24px !important"} fontSize={"16px !important"} fontWeight={"600 !important"}> Start Timer</DialogTitle>

                <DialogActions>
                    <CloseIcon onClick={handleClose}/>
                    <AlarmOnIcon  onClick={handleStartTimer} />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
