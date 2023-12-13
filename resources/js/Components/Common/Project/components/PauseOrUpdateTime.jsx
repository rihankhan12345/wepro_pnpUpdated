import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import PauseIcon from '@mui/icons-material/Pause';
import {
    Box,
    DialogContentText,
    Typography,
} from "@mui/material";
import { useState } from "react";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';

export default function PauseOrUpdateTime({Auth,Id,statusSubmit}) {
    const [open, setOpen] = useState(true);
    const [pause_time, setPause_time] = useState('');

    const handleClose = () =>{
        setPause_time('');
        setOpen(false);
    }
    const currentTime = new Date().toLocaleTimeString();
    const handlePauseTimer = () =>{
        setPause_time(currentTime);
        setOpen(false);
        statusSubmit();
    }
    console.log(pause_time,"currentTime")
    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" maxWidth={"md"} aria-describedby="alert-dialog-slide-description">
                <DialogTitle className="bg-[#0AA283] text-center text-white" padding={"3px 24px !important"} fontSize={"16px !important"} fontWeight={"600 !important"}> Update log details.</DialogTitle>
                    <Typography variant="h6" sx={{ display:'flex',alignItems:"center",justifyContent:"center",pt:"15px" }} >Timer has stopped</Typography>
                    <Typography>Notes</Typography>

                <DialogActions sx={{ display:'flex',justifyContent:'center',alignItems:"center" }}>
                    <CloseIcon onClick={handleClose} sx={{ cursor:"pointer" }}/>
                   <Typography sx={{ cursor:"pointer" }} onClick={handlePauseTimer} >pause
                         <PauseIcon />
                    </Typography>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
