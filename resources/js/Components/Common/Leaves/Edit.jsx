import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "@inertiajs/react";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {
    Button,
    IconButton,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect } from "react";

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

export default function Edit({item,auth}){

        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

        const { data, setData, get, post, processing, errors, reset } = useForm({
            description: item.description,
            requested_date: item.requested_date,
            from_date: item.from_date,
            to_date: item.to_date,
            status: item.status,
            reason: item.reason,
        });

        useEffect(()=>{
            setData({
                description: item.description,
                requested_date: item.requested_date,
                from_date: item.from_date,
                to_date: item.to_date,
                status: item.status,
                reason: item.reason,
            })
        },[item]);

        const submit = (e) => {
            e.preventDefault();
            {
                auth.user.user_role === "admin"
                    ? post(route("admin.user.leave.update",{id:item.id}), {
                          onSuccess: () => {
                              setOpen(false);
                              setData({});
                          },
                      })
                    : post(route("hrManager.user.leave.update",{id:item.id}), {
                          onSuccess: () => {
                              setOpen(false);
                              setData({});
                          },
                      });
            }
        };

        return (
            <div>
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
                                    <form onSubmit={submit}>
                                        <div
                                            style={{
                                                alignItems: "center",
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography
                                                variant="h5"
                                                style={{ fontWeight: "bold" }}
                                            >
                                                Leave form
                                            </Typography>
                                        </div>

                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="Description"
                                                value="Description"
                                                style={{
                                                    fontSize: "15px",
                                                    fontWeight: "bold",
                                                }}
                                            />

                                            <textarea
                                                id=""
                                                type="text"
                                                name="description"
                                                rows={3}
                                                value={data.description}
                                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                                autoComplete="requested_date"
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />

                                            <InputError
                                                message={errors.description}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div style={{ marginTop: "10px" }}>
                                            <InputLabel
                                                htmlFor="Requested Date"
                                                value="Requested Date"
                                                style={{
                                                    fontSize: "15px",
                                                    fontWeight: "bold",
                                                }}
                                            />

                                            <TextInput
                                                id="requested_date"
                                                name="requested_date"
                                                type='datetime-local'
                                                value={data.requested_date}
                                                className="mt-1 block w-full"
                                                autoComplete="requested_date"
                                                isFocused={true}
                                                onChange={(e) =>
                                                    setData(
                                                        "requested_date",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />

                                            <InputError
                                                message={errors.requested_date}
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
                                                    htmlFor="from_date"
                                                    value="from_date"
                                                    style={{
                                                        fontSize: "15px",
                                                        fontWeight: "bold",
                                                    }}
                                                />
                                                <TextInput
                                                    id="from_date"
                                                    type="datetime-local"
                                                    name="from_date"
                                                    value={data.from_date}
                                                    className="mt-1 block w-full"
                                                    autoComplete="from_date"
                                                    onChange={(e) =>
                                                        setData(
                                                            "from_date",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                    style={{
                                                        height: "42px",
                                                        width: "352px",
                                                    }}
                                                />
                                                <InputError
                                                    message={errors.from_date}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="To Date"
                                                    value="To Date"
                                                    style={{
                                                        fontSize: "15px",
                                                        fontWeight: "bold",
                                                        marginLeft: "20px",
                                                    }}
                                                />

                                                <TextInput
                                                    id="to_date"
                                                    type="datetime-local"
                                                    name="to_date"
                                                    value={data.to_date}
                                                    className="mt-1 block w-full"
                                                    autoComplete="to_date"
                                                    onChange={(e) =>
                                                        setData(
                                                            "to_date",
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                    style={{
                                                        height: "42px",
                                                        width: "352px",
                                                        marginLeft: "20px",
                                                    }}
                                                />
                                                <InputError
                                                    message={errors.to_date}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="Status"
                                                value="Status"
                                                style={{
                                                    fontSize: "15px",
                                                    fontWeight: "bold",
                                                }}
                                            />

                                            <Select
                                                value={data.status}
                                                className="w-full block"
                                                onChange={(e) => setData("status",e.target.value) }
                                                name="status"
                                                style={{ height:'45px' }}
                                            >
                                                <MenuItem value="requested">Requested</MenuItem>
                                                <MenuItem value ="approved">Approved</MenuItem>
                                                <MenuItem value = "denied">Denied</MenuItem>
                                            </Select>

                                            <InputError
                                                message={errors.status}
                                                className="mt-2"
                                            />
                                        </div>
                                        {data.status === "denied" && (
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="Reason"
                                                    value="Reason"
                                                    style={{
                                                        fontSize: "15px",
                                                        fontWeight: "bold",
                                                    }}
                                                />
                                                <textarea
                                                    id="reason"
                                                    value={data.reason}
                                                    onChange={(e) =>
                                                        setData(
                                                            "reason",
                                                            e.target.value
                                                        )
                                                    }
                                                    rows={3}
                                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                                    />
                                                <InputError
                                                    message={errors.reason}
                                                    className="mt-2"
                                                />
                                            </div>
                                        )}

                                        <div className="flex items-center justify-center m-8">
                                        <Button
                                                onClick={handleClose}
                                                variant="contained"
                                                color="error"
                                                style={{
                                                    height: "33px",
                                                    marginLeft: "10px",
                                                }}
                                                startIcon={<CloseIcon/>}
                                            >
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
                                                startIcon={<SaveIcon/>}
                                            >
                                                update
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
