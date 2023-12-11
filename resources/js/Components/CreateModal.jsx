import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from '@inertiajs/react';
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { MenuItem, Select } from "@mui/material";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function CreateModal({developer , Id}) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const priority = [ 1,2,3,4,5,6,7,8,9,10];
  const { data, setData, post, processing, errors, reset } = useForm({
      task_name: "",
      description: "",
      start_date: "",
      priority: "",
      developer: [],
      status: "",
  });
  const handleDeveloperSelect = (e) => {

    setData({...data,developer:e.target.value});
};

 const handleSubmit = (e) => {
        e.preventDefault();
        post(route('project.task.save',{id:Id}));
        setOpen(false);
        reset
    };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
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
          }
        }}
      >
        <Fade in={open}>
          <Box sx={style} style={{ width:"800px" }}>


<form onSubmit={handleSubmit} >
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
                                Create Task
                            </Typography>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <InputLabel
                                htmlFor="task-name"
                                value="Task Name"
                                style={{ fontSize: "15px", fontWeight: "bold" }}
                            />

                            <TextInput
                                id="task_name"
                                name="task_name"
                                value={data.task_name}
                                className="mt-1 block w-full"
                                autoComplete="task_name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("task_name", e.target.value)
                                }
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
                                style={{ fontSize: "15px", fontWeight: "bold" }}
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
                                htmlFor="developer"
                                value="Select Developer"
                                style={{ fontSize: "15px", fontWeight: "bold" }}
                            />
                            <Select
                                multiple
                                value={data.developer}
                                style={{ height: "42px" }}
                                onChange={handleDeveloperSelect}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                            >
                                {developer.map((dev,index) => (
                                    console.log(dev,'devvvvvv'),

                                    <MenuItem key={index} value={dev.id} label={dev.name} >
                                        {dev.name} ({dev.user_role=="senior_developer"? "Senior" : "Junior"})
                                    </MenuItem>
                                ))}

                            </Select>
                            <InputError
                                message={errors.developer}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="start_date"
                                value="Start Date"
                                style={{ fontSize: "15px", fontWeight: "bold" }}
                            />

                            <TextInput
                                id="start_date"
                                type="datetime-local"
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

                            <div
                             style={{
                                display:"flex" ,justifyContent:""
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
                                    value={data.priority}
                                    name="priority"
                                    style={{ height: "42px" ,  width:"352px",}}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 "
                                    onChange={(e) =>
                                        setData("priority", e.target.value)
                                    }
                                    required
                                >
                                    <MenuItem selected>Choose Priority</MenuItem>

                                    {priority.map((prio,index) => (
                                    <MenuItem key={index} value={prio} label={prio} >
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
                                    htmlFor="status"
                                    value="Status"
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "bold",
                                        marginLeft:"20px",

                                    }}
                                />
                                <Select
                                    value={data.status}
                                    name="status"
                                    style={{
                                        height: "42px",
                                        width:"352px",marginLeft:"20px"
                                    }}
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 "
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    required
                                >
                                    <MenuItem selected>Choose Status</MenuItem>
                                    <MenuItem value={'New'} >New</MenuItem>
                                    <MenuItem value={'Started'} >Started</MenuItem>
                                    <MenuItem value={'Complete'} >Complete</MenuItem>
                                    <MenuItem value={'Pause'} >Pause</MenuItem>
                                </Select>
                                <InputError
                                    message={errors.priority}
                                    className="mt-2"
                                />
                            </div>
                            </div>

                        <div className="flex items-center justify-center m-8">
                        <PrimaryButton
                                    className="ms-4"
                                    variant="contained"
                                    disabled={processing}
                                    style={{ height:"40px" ,}}
                                >
                                    Create Task
                                </PrimaryButton>

                        </div>
                    </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
