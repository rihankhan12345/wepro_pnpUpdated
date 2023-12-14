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
                            borderTopLeftRadius:"10px",
                            borderTopRightRadius:"10px"
                        }}
                    >
                        <Typography
                            sx={{ fontWeight: "bold", marginLeft: "10px" }}
                        >
                            Salary Information
                        </Typography>
                     <Button sx={{ display: "flex", justifyContent: "center",borderRadius:'10px',height:"40px",marginRight:"10px", }}>
                        <Edit salary={salary} auth={auth}/>
                     </Button>
                    </Grid>
                </Grid>
                <br />
                <Grid container className="px-3">
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            User Name{" "}
                        </Typography>
                        <Typography className="capitalize">
                            {data.name}
                        </Typography>
                    </Grid>
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
                </Grid>
                <br />
                <Grid container className="px-3">
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                           Net Salary
                        </Typography>
                        <Typography className="capitalize">
                            {salary[0]?.net_salary}
                        </Typography>
                    </Grid>
                </Grid>
                </Box>
    );
}
