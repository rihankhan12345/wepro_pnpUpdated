import FormatDate from "@/Util/FormatDate";
import { useForm } from "@inertiajs/react";
import {
    Box,
    Grid,
    Typography,
    Chip,
} from "@mui/material";

export default function Details({ data, auth }) {
    const { setData, get, processing, errors, setError } = useForm();

    return (
        <>
            <Box sx={{ backgroundColor: "#f7f7f7",borderRadius:"10px" }} className="pb-5">
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        style={{
                            background: "rgb(236 236 236)",
                            alignItems: "center",
                            display: "flex",
                            justifyContent: "space-between",
                            height:"50px",
                            borderTopLeftRadius:'10px',
                            borderTopRightRadius:"10px"
                        }}
                    >
                        <Typography
                            sx={{ fontWeight: "bold", marginLeft: "10px" }}
                        >
                            Leave Information
                        </Typography>



                    </Grid>
                </Grid>
                <br />

                <Grid container className="px-3">
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Description
                        </Typography>
                        <Typography className="capitalize">
                            {data.description}
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Requested Date
                        </Typography>
                        <Typography>
                            <FormatDate date={data.requested_date} />
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={{ fontWeight: "bold" }}>
                           Status
                        </Typography>
                        <Typography className="capitalize">
                            <Chip color="primary" label={data.status} />
                        </Typography>
                    </Grid>
                </Grid>
                <br />

                <Grid container className="px-3">
                    <Grid item xs={12}>
                        <Typography sx={{ fontWeight: "bold" }}>
                            Description
                        </Typography>
                        <Typography className="capitalize">
                            {data.description}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <br/>



        </>
    );
}
