import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { router, useForm } from "@inertiajs/react";
import { Alert, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function StatusPopup({auth}) {
    const [open, setOpen] = useState(true);
    const [state , setState] = useState({
        files :[],
    });

    const { data, setData, post, processing, errors, setError } = useForm();

    const handleClose = () => {
        setOpen(false);
    };


    const  fileSelectedHandler = (e) => {
        setState({ files: [...state.files, ...e.target.files] })
    }

    const handleData = () => {
        {
            auth.user.user_role === "senior developer" ||
            auth.user.user_role === "junior developer" ?
            router.post(route('developer.project.saveStatus'))
            : auth.user.user_role === "admin" ?
            router.post(route('admin.project.saveStatus'))
            : <Alert> Route not found File ...</Alert>
        }
    }

    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Status Completed
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please Upload Images Here <br/>
                        <TextField
                        type="file" multiple onChange={fileSelectedHandler}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleData}>Save</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
