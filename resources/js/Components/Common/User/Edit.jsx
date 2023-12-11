import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { FormControl, FormControlLabel, Radio, RadioGroup, IconButton ,Typography, Button } from "@mui/material";
import InputError from "@/Components/InputError";
import {  router, useForm } from "@inertiajs/react";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

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


export default function Edit({ auth, user }) {
    console.log(auth,'authhhh');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { data, setData, get, post, processing, errors, reset } = useForm();

    const [value, setValue] = useState({
        name: user.name,
        email: user.email,
        user_role: user.user_role,
        contact_no: user.contact_no,
    });
    const handleChange = (e) => {
        setValue((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        {
            auth.user.user_role == "admin" ?
            router.post(route("admin.user.update", [user.id]), value)
            :
            router.post(route("hrManager.user.update", [user.id]), value);
        }
        setOpen(false);

    };
    console.log(user.user_role,'userrrr');

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
                                Edit User
                            </Typography>
                        </div>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={value.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            <InputError message={errors.name} className="mt-2" />

                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={value.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) => handleChange(e)}
                                required
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="contact_no" value="Phone No" />

                            <TextInput
                                id="contact_no"
                                type="text"
                                name="contact_no"
                                value={value.contact_no}
                                className="mt-1 block w-full"
                                autoComplete="contact_no"
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            <InputError message={errors.contact_no} className="mt-2" />

                        </div>

                        <div className="mt-4">
                            <FormControl component="fieldset">
                                <InputLabel
                                    htmlFor="user_role"
                                    value="Select User Role"
                                />
                                <RadioGroup
                                    value={value.user_role}
                                    onChange={handleChange}
                                    name="user_role"
                                    row
                                >
                                    {
                                      auth.user.user_role == "admin"  &&
                                        <FormControlLabel
                                        value="admin"
                                        control={<Radio />}
                                        label="Admin"
                                        aria-setsize={"small"}
                                    />
                                    }
                                    <FormControlLabel
                                        value="hr manager"
                                        control={<Radio />}
                                        label="HR Manager"
                                        aria-setsize={"small"}
                                    />
                                    <FormControlLabel
                                        value="project manager"
                                        control={<Radio />}
                                        label="Project Manager"
                                        aria-setsize={"small"}
                                    />
                                    <FormControlLabel
                                        value="senior developer"
                                        control={<Radio />}
                                        label="Senior Developer"
                                        aria-setsize={"small"}
                                    />
                                    <FormControlLabel
                                        value="junior developer"
                                        control={<Radio />}
                                        label="Junior Developer"
                                        aria-setsize={"small"}
                                    />
                                </RadioGroup>
                            </FormControl>

                            <InputError message={errors.user_role} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-center mt-4">
                            <PrimaryButton
                                className="ms-4"
                                style={{
                                    height: "40px",
                                    backgroundColor: "#1976d2",
                                    width: "150px",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                Update User
                            </PrimaryButton>
                            <Button onClick={handleClose} variant="contained" color="success"
                                    style={{
                                        height: "33px", marginLeft:"10px"
                                    }}> Close</Button>
                        </div>
                    </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
