import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { router, useForm } from "@inertiajs/react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';

import {
    Alert,
    Box,
    Button,
    Grid,
    IconButton,
    Input,
    TextareaAutosize,
    Typography,
} from "@mui/material";
import { useState } from "react";

export default function StatusPopup({ auth ,Id}) {
    const [open, setOpen] = useState(true);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const { data, setData, post, processing, errors, setError } = useForm({
        task_file:[],
        text_cases :"",
    });

    const handleClose = () => {
        setOpen(false);
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        setData("task_file",[...files]);
    };

    const handleDelete = (index) => {
        const updatedFiles = [...data.task_file];
        updatedFiles.splice(index, 1);
        setData("task_file",updatedFiles);
    };

    const handleData = (e) => {
        e.preventDefault();
                {
            auth.user.user_role === "senior developer" ||
            auth.user.user_role === "junior developer" ? (
              post(route("developer.project.file",{id:Id}),data ,{
                    onSuccess:()=>{
                        setData({});
                        setOpen(false);
                    }
                } )
            ) : auth.user.user_role === "admin" ?
              post(route("admin.project.file",{id:Id}),data ,{
                onSuccess:()=>{
                    setData({});
                    setOpen(false);
                }
            }
            ) : (
                <Alert> Route not found  ...</Alert>
            );
            setOpen(false);
        }


    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                maxWidth={"md"}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle
                    className="bg-[#0AA283] text-center text-white"
                    padding={"3px 24px !important"}
                    fontSize={"16px !important"}
                    fontWeight={"600 !important"}

                >
                    Status Completed
                </DialogTitle>
                <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 0,
            color:"black"
          }}
        >
          <CloseIcon />
        </IconButton>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box>
                            <Grid container spacing={2} padding={"10px 20px"}>
                                <Grid item xs={12}>
                                    <Typography
                                        fontWeight={"bold"}
                                        variant="subtitle2"
                                    >
                                        Text Cases
                                    </Typography>
                                    <TextareaAutosize
                                        minRows={2}
                                        value={data.text_cases}
                                        className="w-full block"
                                        onChange={(e)=>setData("text_cases",e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="subtitle2"
                                        fontWeight={"bold"}
                                    >
                                        Images
                                    </Typography>
                                    <Input
                                        type="file"
                                        inputProps={{ multiple: true }}
                                        onChange={handleFileChange}
                                    />
                                    <Grid
                                        container
                                        spacing={2}
                                        padding={"30px 20px"}
                                    >
                                        {data.task_file.map((file, index) => (
                                            <Grid
                                                item
                                                xs={12}
                                                md={4}
                                                sm={6}
                                                key={index}
                                            >
                                                <div
                                                    style={{
                                                        position: "relative",
                                                    }}
                                                >
                                                    <a
                                                        href={URL.createObjectURL(
                                                            file
                                                        )}
                                                        target="_blank"
                                                    >
                                                        <img
                                                            src={URL.createObjectURL(
                                                                file
                                                            )}
                                                            alt={`selected-${index}`}
                                                        />
                                                    </a>
                                                    <Button
                                                        style={{
                                                            position:
                                                                "absolute",
                                                            top: 0,
                                                            right: 0,
                                                            background:
                                                                "transparent",
                                                        }}
                                                        onClick={() =>
                                                            handleDelete(index)
                                                        }
                                                    >
                                                        <DeleteIcon color="error" />
                                                    </Button>
                                                </div>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleData} variant="contained">upload</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
