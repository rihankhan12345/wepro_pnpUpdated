import DoDisturbAltIcon from '@mui/icons-material/DoDisturbAlt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const LeaveReason = {
    'requested':{
        title:'requested',
        color:'primary',
        icon: <MailOutlineIcon/>
    },
    'approved':{
        title:'approved',
        color:'success',
        icon: <CheckCircleOutlineIcon/>
    },
    'denied':{
        title:'denied',
        color:'error',
        icon: <DoDisturbAltIcon/>
    }
}

const LeaveStyle = {
    LeaveReason,
}

export default LeaveStyle;
