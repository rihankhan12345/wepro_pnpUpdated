import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";
import { useForm } from "@inertiajs/react";
import { IconButton } from "@mui/material";

export default function Popover({ id }) {
    const [open, setOpen] = React.useState(false);
    const { data, setData, post, processing, errors, setError } = useForm();
    const handleDelete = (id) => {
        post(route("admin.user.delete", { id }));
        handleClose();
    };
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <IconButton aria-label="delete">
                <DeleteIcon color="error" onClick={handleClick} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <WarningOutlinedIcon
                        color="red"
                        style={{
                            height: "100px",
                            width: "50px",
                            color: "red",
                            marginLeft: "10px",
                        }}
                    />

                    {"Alert Message For Delete Item?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to want to Delete This Item !!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(id)}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose}
                        autoFocus
                    >
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
