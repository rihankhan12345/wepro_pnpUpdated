import EditIcon from "@mui/icons-material/Edit";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import _debounce from 'lodash/debounce';
import {  IconButton, TextField, Typography,  } from "@mui/material";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
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

export default function Edit({auth,salary}) {
    console.log(salary,'salary');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { data, setData, post, processing, errors } = useForm({
        basic_salary: salary[0].basic_salary,
        house_rent: salary[0].house_rent,
        leave_allowance: salary[0].leave_travel_allowance,
        medical_conveyance: salary[0].medical_and_Conveyance,
        statutory_bonus: salary[0].statutory_bonus,
        tax_deducted: salary[0].tax_deducted_at_source,
        provided_fund: salary[0].provided_fund,
        gross_salary: salary[0].gross_salary,
        net_salary: salary[0].net_salary,
      });

      React.useEffect(() => {
          const grossSalary =
            Number(data.basic_salary) +
            Number(data.house_rent) +
            Number(data.leave_allowance) +
            Number(data.medical_conveyance) +
            Number(data.statutory_bonus) +
            Number(data.provided_fund);
          setData("gross_salary", isNaN(grossSalary) ? 0 : grossSalary);
        }, [
          data.basic_salary,
          data.house_rent,
          data.leave_allowance,
          data.medical_conveyance,
          data.statutory_bonus,
          data.provided_fund,
        ]);

        React.useEffect(() => {
          const taxDeducted =
            (Number(data.gross_salary) * Number(data.tax_deducted)) / 100;
          const netSalary = Math.ceil(Number(data.gross_salary) - taxDeducted);
          setData("net_salary", isNaN(netSalary) ? 0 : netSalary);
        }, [data.gross_salary, data.tax_deducted]);

        const handleChange = (e) => {
          setData(e.target.name, e.target.value);
        };

        function validatePhone(e,number) {
            const inputValue = e.target.value;
            if (inputValue.length > number) {
                const requiredValue = inputValue.slice(0, number);
                handleChange(e.target.name,requiredValue);
            } else {
                handleChange(e.target.name,inputValue);
            }
        }

        const handleSubmit = (e) => {
          e.preventDefault();
          {
            auth.user.user_role === "admin" ?
            post(route("admin.user.salary.update",{id:salary[0].user_id} ),{
                onSuccess:()=>{
                    setOpen(false);
                }
              })
              : auth.user.user_role === 'hr manager' &&
              post(route("hrManager.user.salary.update",{id:salary[0].user_id} ),{
                onSuccess:()=>{
                    setOpen(false);
                }
              });
          }
        };
    return (
        <>
            <IconButton aria-label="edit" color="primary">
                <EditIcon color="info" onClick={handleOpen}/>
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
                        <Typography variant="h5" align="center" className="pt-3 pb-5" sx={{ fontWeight: "bold" }}>
                            Salary Compensation
                         </Typography>
                        <Box
                            component="form"
                            sx={{ display: "flex", flexDirection: "column" }}
                            onSubmit={handleSubmit}
                        >
                            <div className="pb-5">
                                <InputLabel sx={{ fontWeight: "500" }}>
                                    Basic Salary
                                </InputLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id="basic_salary"
                                    name="basic_salary"
                                    type="number"
                                    value={data.basic_salary }
                                    autoComplete="basic_salary"
                                    onChange={handleChange}
                                    size="small"
                                />
                                <InputError
                                    message={errors.basic_salary}
                                    className="mt-2"
                                />
                            </div>
                            <div className="pb-5">
                                <InputLabel sx={{ fontWeight: "500" }}>
                                    House Rent
                                </InputLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id="house_rent"
                                    name="house_rent"
                                    type="number"
                                    value={data.house_rent}
                                    autoComplete="house_rent"
                                    onChange={handleChange}
                                    size="small"
                                />
                                <InputError
                                    message={errors.house_rent}
                                    className="mt-2"
                                />
                            </div>
                            <div className="pb-5">
                                <InputLabel sx={{ fontWeight: "500" }}>
                                    Leave And Travel Allowance
                                </InputLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id="leave_allowance"
                                    name="leave_allowance"
                                    type="number"
                                    value={data.leave_allowance}
                                    autoComplete="leave_allowance"
                                    onChange={handleChange}
                                    size="small"
                                />
                                <InputError
                                    message={errors.leave_allowance}
                                    className="mt-2"
                                />
                            </div>
                            <div className="pb-5">
                                <InputLabel sx={{ fontWeight: "500" }}>
                                    Medical And Conveyance
                                </InputLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id="medical_conveyance"
                                    name="medical_conveyance"
                                    type="number"
                                    value={data.medical_conveyance}
                                    autoComplete="medical_conveyance"
                                    onChange={handleChange}
                                    size="small"
                                />
                                <InputError
                                    message={errors.medical_conveyance}
                                    className="mt-2"
                                />
                            </div>
                            <div className="pb-5">
                                <InputLabel sx={{ fontWeight: "500" }}>
                                    Statutory Bonus
                                </InputLabel>
                                <TextField
                                    required
                                    fullWidth
                                    id="statutory_bonus"
                                    name="statutory_bonus"
                                    type="number"
                                    value={data.statutory_bonus}
                                    autoComplete="statutory_bonus"
                                    onChange={handleChange}
                                    size="small"
                                />
                                <InputError
                                    message={errors.statutory_bonus}
                                    className="mt-2"
                                />
                            </div>
                            <div className="pb-5" style={{ display: "flex" }}>
                                <div
                                    style={{
                                        width: "50%",
                                        paddingRight: "5px",
                                    }}
                                >
                                    <InputLabel sx={{ fontWeight: "500" }}>
                                        Tax Deducted At Source (%)
                                    </InputLabel>
                                    <TextField
                                        required
                                        fullWidth
                                        id="tax_deduct"
                                        name="tax_deducted"
                                        type="number"
                                        value={data.tax_deducted}
                                        autoComplete="tax_deduct"
                                        onChange={handleChange}
                                        size="small"
                                    />
                                    <InputError
                                        message={errors.tax_deducted}
                                        className="mt-2"
                                    />
                                </div>
                                <div style={{ width: "50%" }}>
                                    <InputLabel sx={{ fontWeight: "500" }}>
                                        Provided Fund
                                    </InputLabel>
                                    <TextField
                                        required
                                        fullWidth
                                        id="provided_fund"
                                        name="provided_fund"
                                        type="number"
                                        value={data.provided_fund  }
                                        autoComplete="provided_fund"
                                        onChange={handleChange}
                                        size="small"
                                    />
                                    <InputError
                                        message={errors.provided_fund}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="pb-5" style={{ display: "flex" }}>
                                <div
                                    style={{
                                        width: "50%",
                                        paddingRight: "5px",
                                    }}
                                >
                                    <InputLabel sx={{ fontWeight: "500" }}>
                                        Gross Salary
                                    </InputLabel>
                                    <TextField
                                        required
                                        fullWidth
                                        id="gross_salary"
                                        type="number"
                                        value={data.gross_salary}
                                        autoComplete="gross_salary"
                                        size="small"
                                    />
                                    <InputError
                                        message={errors.gross_salary}
                                        className="mt-2"
                                    />
                                </div>
                                <div style={{ width: "50%" }}>
                                    <InputLabel sx={{ fontWeight: "500" }}>
                                        Net Salary
                                    </InputLabel>
                                    <TextField
                                        required
                                        fullWidth
                                        id="net_salary"
                                        type="number"
                                        value={data.net_salary}
                                        autoComplete="net_salary"
                                        size="small"
                                    />
                                    <InputError
                                        message={errors.net_salary}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="flex salarys-center justify-center m-8">
                                <PrimaryButton
                                    className="ms-4"
                                    variant="contained"
                                    disabled={processing}
                                    style={{ height: "40px" }}
                                >
                                    Save
                                </PrimaryButton>
                            </div>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}
