import Edit from "@/Components/Common/Project/Salary/Edit";
import { Box, Button, Grid, Typography } from "@mui/material";


export default function Details({auth,salary ,data}){

    return (
             <Box
               sx={{ backgroundColor: '#f7f7f7',borderRadius:"10px" }} className="pb-5" >
                <Grid container >
                    <Grid
                        item
                        xs={12}
                        style={{
                            background: "rgb(236 236 236)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            height:"50px",
                        }}
                    >
                        <Typography
                            sx={{ fontWeight: "bold", marginLeft: "10px" }}
                        >
                            Salary Information
                        </Typography>
                     <Button sx={{ display: "flex", justifyContent: "center",borderRadius:'10px',height:"40px",marginRight:"10px", }}>
                        <Edit salary={salary} auth={auth} userId={data.id}/>
                     </Button>
                    </Grid>
                </Grid>
                <br />
                <Grid container className="px-3">

                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                           Basic Salary
                        </Typography>
                        <Typography>{salary[0]?.basic_salary}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Gross Salary
                        </Typography>
                        <Typography className="capitalize">
                            {salary[0]?.gross_salary}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                           Net Salary
                        </Typography>
                        <Typography className="capitalize">
                            {salary[0]?.net_salary}
                        </Typography>
                    </Grid>
                </Grid>
                <br />
                <Grid container className="px-3">
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                           Tax Deduction
                        </Typography>
                        <Typography className="capitalize">
                            {salary[0]?.tax_deducted_at_source}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                           Medical And Conveyance
                        </Typography>
                        <Typography className="capitalize">
                            {salary[0]?.medical_and_Conveyance}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Leave Travel Allowance
                        </Typography>
                        <Typography className="capitalize">
                            {salary[0]?.leave_travel_allowance}
                        </Typography>
                    </Grid>
                </Grid>
                <br />
                <Grid container className="px-3">
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                           Statutory Bonus
                        </Typography>
                        <Typography className="capitalize">
                            {salary[0]?.statutory_bonus}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                          Provided Fund
                        </Typography>
                        <Typography className="capitalize">
                            {salary[0]?.provided_fund}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            House Rent
                        </Typography>
                        <Typography className="capitalize">
                            {salary[0]?.house_rent}
                        </Typography>
                    </Grid>
                </Grid>
                </Box>
    );
}
