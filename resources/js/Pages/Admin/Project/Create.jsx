import { useState } from "react";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {
    Alert,
    Box,
    Button,
    Grid,
    Typography,
} from "@mui/material";
import { useEffect } from "react";
import SuccessMsg from "@/Components/Common/SuccessMsg";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

export default function Create({developer, manager }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [alert,setAlert] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        start_date: "",
        project_manager: "",
        developer: [],
    });

    const handleDeveloper = (id) => {
        setData((prev) => ({
            ...prev,
            developer: prev.developer
                ? prev.developer.includes(id)
                    ? prev.developer.filter((value) => value !== id)
                    : [...prev.developer, id]
                : [id],
        }));
    };

    const handleClose = () => {
        setOpen(false);
        setData({});
    }

    useEffect(()=>{
        setData({
            title: "",
            description: "",
            start_date: "",
            project_manager: "",
            developer: [],
        })
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.project.save"),{
            onSuccess: ( )=> {
                setAlert("Project created Successfully");
                handleClose();
                setData({});
            }
        });
        setOpen(false);
    };
    return (
        <div>
            {
                alert && <SuccessMsg error={alert} setError={setAlert} title={alert}/>
            }
            <Button
                variant="contained"
                onClick={handleOpen}
                size="small"
                startIcon={<AddIcon />}
            >
                Create
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style} style={{ width: "800px" }}>
                        <div className="rounded-t-xl bg-slate-50 border-gray-100 border border-t-0 shadow-sm p-5" >
                        <div style={{alignItems: "center",display: "flex",justifyContent: "center",paddingBottom:"10px"}}>
                        <form onSubmit={handleSubmit}>
                            <div
                                style={{
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingBottom: "30px",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    style={{ fontWeight: "bold" }}
                                >
                                    Create Project
                                </Typography>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <InputLabel htmlFor="title" value="Title" />

                                <TextInput
                                    id="title"
                                    name="Title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    autoComplete="title"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                />

                                <textarea
                                    id="description"
                                    type="text"
                                    name="description"
                                    rows={3}
                                    value={data.description}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    autoComplete="description"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="manager"
                                    value="Select Manager"
                                />

                                {manager.length == 0 ? (
                                    <Alert severity="info">
                                        Don't have project Manager
                                    </Alert>
                                ) : (
                                    <select
                                        value={data.project_manager}
                                        name="project_manager"
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        onChange={(e) =>
                                            setData(
                                                "project_manager",
                                                e.target.value
                                            )
                                        }
                                        required
                                    >
                                        <option>Select Manager</option>

                                        {manager.map((mngr, index) => {
                                            return (
                                                <option
                                                    value={mngr.name}
                                                    key={index}
                                                >
                                                    {mngr.name} ({mngr.email})
                                                </option>
                                            );
                                        })}
                                    </select>
                                )}
                                <InputError
                                    message={errors.project_manager}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="Assign Date"
                                    value="Assign Date"
                                />

                                <TextInput
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={data.start_date}
                                    className="mt-1 block w-full"
                                    autoComplete="start_date"
                                    onChange={(e) =>
                                        setData("start_date", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.start_date}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="developer"
                                    value="Assign To"
                                />
                                {/* <Select
                                multiple
                                value={data.developer}
                                style={{ height: "42px" }}
                                onChange={handleDeveloperSelect}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"

                            > */}
                                <Grid item xs={12}>
                                    {developer.length == 0 ? (
                                        <Alert severity="info">
                                            Don't Have Any Developer
                                        </Alert>
                                    ) : (
                                        developer.map((dev, index) => (
                                            <Button
                                                key={index}
                                                variant={
                                                    data?.developer?.includes(dev.id)
                                                        ? "contained"
                                                        : "outlined"
                                                }
                                                size="small"
                                                onClick={() =>
                                                    handleDeveloper(dev?.id)
                                                }
                                                style={{ margin: "2px" }}
                                            >
                                                {dev.name} (
                                                {dev.user_role ==
                                                "senior developer"
                                                    ? "Senior"
                                                    : "Junior"}
                                                )
                                            </Button>
                                        ))
                                    )}
                                </Grid>

                                {/* </Select> */}
                                <InputError
                                    message={errors.developer}
                                    className="mt-2"
                                />
                            </div>

                            {/* <div className="mt-4">
                                <InputLabel
                                    htmlFor="end_date"
                                    value="End Date"
                                    style={{ marginLeft: "20px" }}
                                />

                                <TextInput
                                    id="end_date"
                                    type="date"
                                    name="end_date"
                                    value={data.end_date}
                                    className="mt-1"
                                    style={{
                                        width: "410px",
                                        marginLeft: "20px",
                                    }}
                                    autoComplete="end_date"
                                    onChange={(e) =>
                                        setData("end_date", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.end_date}
                                    className="mt-2"
                                />
                            </div> */}

                            <div className="flex items-center justify-center m-8">
                            <Button onClick={handleClose} variant="contained" color="error"
                                    style={{
                                        height: "33px", marginLeft:"10px"
                                    }} startIcon={<CloseIcon/>}
                                    >Cancle</Button>
                                <PrimaryButton
                                    className="ms-4"
                                    variant="contained"
                                    disabled={processing}
                                    style={{
                                        height: "40px",
                                        backgroundColor: "#1976d2",
                                    }} >
                                    <SaveIcon sx={{ height:'15px' }}/>Create
                                </PrimaryButton>

                            </div>
                        </form>
                        </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
