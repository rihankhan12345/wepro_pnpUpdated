import { Snackbar, Stack } from "@mui/material";
import React from 'react'
import MuiAlert from '@mui/material/Alert';
import { useState } from "react";


export default function SuccessMsg({error,setError,title,severity}){
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
      });
    const { vertical, horizontal } = state;
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setError(false);
    };
    return (
        <Stack spacing={2} sx={{ width: '100%', zIndex:"9999", display:"contents" }}>
            <Snackbar open={error} autoHideDuration={5000} onClose={handleAlertClose} key={vertical + horizontal}  anchorOrigin={{ vertical, horizontal }} >
                <Alert severity={severity} sx={{ width: '100%', zIndex:"9999" }}>{title}</Alert>
            </Snackbar>
        </Stack>
  )
}
