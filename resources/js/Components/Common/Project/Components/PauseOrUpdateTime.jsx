import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from '@mui/icons-material/Close';
import PauseIcon from '@mui/icons-material/Pause';
import {
    Box,
    Button,
    DialogContentText,
    Typography,
} from "@mui/material";
import { useState } from "react";
import AlarmOnIcon from '@mui/icons-material/AlarmOn';

export default function PauseOrUpdateTime({auth,pauseStatus ,updated, setState ,setIsEdit, state}) {
    const [open, setOpen] = useState(true);
    const [pause_time, setPause_time] = useState('');
    const [item,setItem] = useState({ status : 'pause'});
    const handleClose = () =>{
        setPause_time('');
        setOpen(false);
        setIsEdit(false);
        setState(state);
    }

    const currentTime = new Date().toLocaleTimeString();
    const handlePauseTimer = (e) =>{
        setPause_time(currentTime);
        setOpen(false);
        pauseStatus(item);
    }
    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" maxWidth={"md"} aria-describedby="alert-dialog-slide-description">
                <DialogTitle className="bg-[#0AA283] text-center text-white" padding={"3px 24px !important"} fontSize={"16px !important"} fontWeight={"600 !important"}> Task Status Warning</DialogTitle>
                    <Typography variant="h6" sx={{ display:'flex',alignItems:"center",justifyContent:"center",pt:"15px" }} >One Task is Already Start</Typography>
                    <Typography sx={{ p:'0px 12px' }}>Task Id : {updated[0].id} , Task Name : {updated[0].task_name} and start time of task : {updated[0].started_at}</Typography>
                    <Typography sx={{ pl:'16px' }}> if you want to start current task first pause task " {updated[0].task_name} (task id :{updated[0].id}) "</Typography>

                <DialogActions sx={{ display:'flex',justifyContent:'center',alignItems:"center" }}>
                    <Button variant="contained" color="error" startIcon={<CloseIcon/>} onClick={handleClose} sx={{ cursor:"pointer" }}>cancle </Button>
                    <Button variant="contained" color="primary" startIcon={<PauseIcon />} onClick={handlePauseTimer} sx={{ cursor:"pointer" }}>Pause </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
