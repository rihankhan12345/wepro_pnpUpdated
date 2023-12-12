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

export default function StartTimerPopUp() {
    const [open, setOpen] = useState(true);
    const [pause_time, setPause_time] = useState('');

    const handleClose = () =>{
        setPause_time('');
        setOpen(false);
    }
    const currentTime = new Date().toLocaleTimeString();
    const handleStartTimer = () =>{
        setPause_time(currentTime);
        setOpen(false);
        statusSubmit();
    }
    console.log(pause_time,"currentTime")
    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" maxWidth={"md"} aria-describedby="alert-dialog-slide-description">
                <DialogTitle className="bg-[#0AA283] text-center text-white" padding={"3px 24px !important"} fontSize={"16px !important"} fontWeight={"600 !important"}> Start Timer</DialogTitle>
                    <Typography variant="h4" sx={{ display:'flex',alignItems:"center",justifyContent:"center",pt:"15px" }} >Are You Sure?</Typography>

                    <Box sx={{ padding:"10px 40px" }}>
                        <DialogContentText id="alert-dialog-description" sx={{ textAlign:"center" }}>
                            Do you really want to update task?
                        </DialogContentText>
                    </Box>

                <DialogActions sx={{ display:'flex',justifyContent:'center',alignItems:"center" }}>
                    <CloseIcon onClick={handleClose} sx={{ cursor:"pointer" }}/>
                   <Typography sx={{ cursor:"pointer" }} onClick={handleStartTimer} >Pause <PauseIcon /></Typography>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
