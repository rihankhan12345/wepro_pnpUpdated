import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import CloseIcon from '@mui/icons-material/Close';
import {
    Button,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "@inertiajs/react";
import UpdateIcon from '@mui/icons-material/Update';
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
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

export default function Edit({ data, auth, developer, manager, devId }) {
    console.log(manager,'data');

    const [open, setOpen] = useState(false);
    const [alert ,setAlert] = useState(false);
    const handleOpen = () => setOpen(true);
    const { post, processing, errors, reset } = useForm();

    const [item, setItem] = useState({
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        project_manager: data.project_manager,
        developer: devId,
    });

    const handleChange = (e) => {
        setItem((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };
    const handleClose = () => {
        setOpen(false);
    }
    useEffect(()=>{
        setItem({
            title: data.title,
            description: data.description,
            start_date: data.start_date,
            end_date: data.end_date,
            project_manager: data.project_manager,
            developer: devId,
        });
    },[data]);
    const handleDeveloper = (id) => {
        setItem((prev) => ({
            ...prev,
            developer: prev.developer
                ? prev?.developer?.includes(id)
                    ? prev.developer.filter((value) => value !== id)
                    : [...prev.developer, id]
                : [id],
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("admin.project.update", [data.id]), item,{
            onSuccess:()=>{
                setAlert('Projectupdated');
            }
        });
    };

    return (
        <div>
        {
            alert && <SuccessMsg error={alert} setError={setAlert} title={alert}/>
        }
       {
        auth.user.user_role !== 'hr manager' &&
        <IconButton aria-label="edit" color="primary">
            <EditIcon color="info" onClick={handleOpen}/>
        </IconButton>
       }
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
        >
            <Fade in={open}>
                <Box sx={style} style={{ width: "800px" }}>
                    <div className="rounded-t-xl bg-slate-50 border-gray-100 border border-t-0 shadow-sm p-5">
                        <div
                            style={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center",
                                paddingBottom: "10px",
                            }}
                        >
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
                                style={{ fontWeight: "bold" ,paddingTop:'20px'}}
                            >
                                Edit Project
                            </Typography>
                        </div>
                        <div>
                            <InputLabel htmlFor="title" value="Title" />

                            <TextInput
                                id="title"
                                name="title"
                                value={item.title}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={(e) => handleChange(e)}
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
                                value={item.description}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                autoComplete="description"
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="Manager"
                                value="Select Manager"
                            />
                            <select
                                value={item.project_manager}
                                name="project_manager"
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                onChange={(e) => handleChange(e)}
                                required
                            >
                                {manager.map((mngr, index) => {
                                    console.log(mngr,'manager');
                                    return (

                                        <option value={mngr.name} key={index}>
                                        {mngr.name}
                                       </option>

                                    );
                                })}
                            </select>
                            <InputError
                                message={errors.project_manager}
                                className="mt-2"
                            />
                        </div>

                        {/* <div className="mt-4">
                            <InputLabel
                                htmlFor="Assign Date"
                                value="Assign Date"
                            />

                            <TextInput
                                id="start_date"
                                type="date"
                                name="start_date"
                                value={item.start_date}
                                className="mt-1 block w-full"
                                autoComplete="start_date"
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            <InputError
                                message={errors.start_date}
                                className="mt-2"
                            />
                        </div> */}

                        <div className="mt-4">
                            <InputLabel htmlFor="developer" value="Assign To" />

                            <Grid item xs={12}>
                                {developer.map((dev, index) => (
                                    <Button
                                        key={index}
                                        variant={
                                            item.developer.includes(dev.id)
                                                ? "contained"
                                                : "outlined"
                                        }
                                        size="small"
                                        onClick={() => handleDeveloper(dev?.id)}
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
                            <Button
                                onClick={handleClose}
                                variant="contained"
                                color="error"
                                style={{
                                    height: "33px",
                                    marginLeft: "10px",
                                }}
                                startIcon={<CloseIcon/>}>
                                Cancle
                            </Button>
                            <PrimaryButton
                                className="ms-4"
                                variant="contained"
                                disabled={processing}
                                style={{
                                    height: "40px",
                                    backgroundColor: "#1976d2",
                                }}
                            >
                               <UpdateIcon sx={{ height:'15px' }}/> Update
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
