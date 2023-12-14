import { Head, router, useForm } from "@inertiajs/react";
import { Button, Grid, IconButton, MenuItem, Select, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import CloseIcon from '@mui/icons-material/Close';

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

export default function Edit({ data, developer, devId ,auth }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const priority = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const level = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const { post, get, processing, errors, reset } = useForm();

    const result = Object.keys(developer).map((key) => developer[key]);
    const dev = developer.map((dev)=>
    {
        if( dev.id == devId) {

            return dev.id;
        }
    });

       const [item, setItem] = useState({
        task_name: data.task_name,
        description: data.description,
        start_date: data.start_date,
        priority: data.priority,
        developer:  dev,
        level: data.level,
    });

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleDeveloper = (id) => {
        setItem((prev) => ({
            ...prev,
            developer: prev?.developer?.includes(id)
                ? prev.developer.filter((value) => value !== id)
                : [...prev.developer, id],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        {
            auth.user.user_role == "admin" ?
            router.post(route("admin.project.task.update", { id: data.id }), item ,{
                onSuccess: ( )=> {
                    setItem({});
                    setOpen(false);
                }
            })

            :
            // auth.user.user_role == "project manager" &&
            router.post(route("projectManager.project.task.update", { id: data.id }), item ,{
                onSuccess: ( )=> {
                    setOpen(false);
                    setItem({});
                }
            });
        }
        handleClose();
    };

    return (
        <>
            <IconButton aria-label="edit" color="primary">
                <EditIcon color="info" onClick={handleOpen} />
            </IconButton>
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
                style={{ width: "" }}
            >
                <Fade in={open}>
                    <Box sx={style} style={{ width: "800px" }}>
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
                                    Edit Task
                                </Typography>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <InputLabel
                                    htmlFor="task-name"
                                    value="Task Name"
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}
                                />

                                <TextInput
                                    id="task_name"
                                    name="task_name"
                                    value={item.task_name}
                                    className="mt-1 block w-full"
                                    autoComplete="task_name"
                                    onChange={handleChange}
                                    required
                                />

                                <InputError
                                    message={errors.task_name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="description"
                                    value="Description"
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}
                                />

                                <textarea
                                    id="description"
                                    type="text"
                                    name="description"
                                    rows={3}
                                    value={item.description}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                    autoComplete="description"
                                    onChange={handleChange}
                                    required
                                />

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>


                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "",
                                }}
                            >
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="priority"
                                        value="Priority"
                                        style={{
                                            fontSize: "15px",
                                            fontWeight: "bold",
                                        }}
                                    />
                                    <Select
                                        value={item.priority}
                                        name="priority"
                                        style={{
                                            height: "42px",
                                            width: "352px",
                                        }}
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                        onChange={handleChange}
                                        required
                                    >
                                        {priority.map((prio, index) => (
                                            <MenuItem
                                                key={index}
                                                value={prio}
                                                label={prio}
                                            >
                                                {prio}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <InputError
                                        message={errors.priority}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="level"
                                        value="Task Level"
                                        style={{
                                            fontSize: "15px",
                                            fontWeight: "bold",
                                            marginLeft: "20px",
                                        }}
                                    />
                                    <Select
                                        value={item.level}
                                        name="level"
                                        style={{
                                            height: "42px",
                                            width: "352px",
                                            marginLeft: "20px",
                                        }}
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full "
                                        onChange={handleChange}
                                        required
                                    >
                                        <MenuItem>Choose level</MenuItem>
                                        {level.map((lab, index) => (
                                            <MenuItem
                                                key={index}
                                                value={lab}
                                                label={lab}
                                            >
                                                {lab}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <InputError
                                        message={errors.label}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="developer"
                                    value="Assign To"
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                    }}
                                />
                                <Grid item xs={12}>
                                    {developer.map((dev, index) => (
                                        <Button
                                            key={index}
                                            variant={
                                                item?.developer?.includes(dev.id)
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
                                            {dev.user_role == "senior developer"
                                                ? "Senior"
                                                : "Junior"}
                                            )
                                        </Button>
                                    ))}
                                </Grid>
                                <InputError
                                    message={errors.developer}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex items-center justify-center m-8">
                            <Button onClick={handleClose} variant="contained" color="error"
                                    style={{
                                        height: "33px", marginLeft:"10px"
                                    }}
                                    startIcon={<CloseIcon/>}
                                    >Cancle</Button>
                                <PrimaryButton
                                    className="ms-4"
                                    variant="contained"
                                    disabled={processing}
                                    style={{
                                        height: "40px",
                                        backgroundColor: "#1976d2",
                                    }}
                                >
                                    Update Task
                                </PrimaryButton>

                            </div>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
