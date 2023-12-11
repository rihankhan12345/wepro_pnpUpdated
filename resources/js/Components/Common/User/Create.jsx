import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import * as React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AddIcon from "@mui/icons-material/Add";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";

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

export default function Create({ auth }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { data, setData, get, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        user_role: "",
        salary: "",
    });


    const submit = (e) => {
        e.preventDefault();
            {
            auth.user.user_role === "admin" ?
            post(route("admin.user.save"), {
                onSuccess: ( )=> {
                    handleClose();
                    setData({});
                }
            })
            :
            post(route('hrManager.user.save'),{
                onSuccess: ( )=> {
                    handleClose();
                    setData({});
                }
            })
        }

    };

    return (
        <div>
        <Button
            variant="contained"
            onClick={handleOpen}
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
                    <form onSubmit={submit}>
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
                                Create User
                            </Typography>
                        </div>
                        <div>
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="contact_no" value="Phone No" />

                            <TextInput
                                id="contact_no"
                                type="number"
                                name="contact_no"
                                value={data.contact_no}
                                className="mt-1 block w-full"
                                autoComplete="contact_no"
                                onChange={(e) =>
                                    setData("contact_no", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.contact_no}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <FormControl component="fieldset">
                                <InputLabel
                                    htmlFor="user_role"
                                    value="Select User Role"
                                />
                                <RadioGroup
                                    value={data.user_role}
                                    onChange={(e) =>
                                        setData("user_role", e.target.value)
                                    }
                                    row
                                >
                                    {
                                        auth.user.user_role=="admin" &&
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

                            <InputError
                                message={errors.user_role}
                                className="mt-2"
                            />
                        </div>

                        {data.user_role === "admin" ? (
                            <div className="flex items-center justify-center m-4">
                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                    style={{
                                        height: "40px",
                                        backgroundColor: "#1976d2",
                                    }}
                                >
                                    Create User
                                </PrimaryButton>
                            </div>
                        ) : (
                            <>
                                <div className="mt-4">
                                    <InputLabel
                                        htmlFor="salary"
                                        value="Salary"
                                    />

                                    <TextInput
                                        id="salary"
                                        type="number"
                                        name="salary"
                                        value={data.salary}
                                        className="mt-1 block w-full"
                                        autoComplete="consalarytact_no"
                                        onChange={(e) =>
                                            setData("salary", e.target.value)
                                        }
                                        required
                                    />

                                    <InputError
                                        message={errors.salary}
                                        className="mt-2"
                                    />
                                </div>
                                <div className="flex items-center justify-center m-4">
                                    <PrimaryButton
                                        className="ms-4"
                                        disabled={processing}
                                        style={{
                                            height: "40px",
                                            backgroundColor: "#1976d2",
                                        }}
                                    >
                                        Next
                                    </PrimaryButton>
                                    <Button onClick={handleClose} variant="contained" color="success"
                                    style={{
                                        height: "33px", marginLeft:"10px"
                                    }}
                                    >Close</Button>
                                </div>
                            </>
                        )}
                    </form>
                </Box>
                </Fade>
            </Modal>
        </div>
    );
}
