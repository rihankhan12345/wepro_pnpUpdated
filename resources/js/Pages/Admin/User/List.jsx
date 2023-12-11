import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Popover from "@/Components/Popover";
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
    Box,
    Button,
    Chip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import GlobalStyle from "@/Constant/GlobalStyle";
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import Create from "@/Components/Common/User/Create";
import Edit from "@/Components/Common/User/Edit";

export default function List({data, auth }) {

    const {  setData, get, processing, errors, setError } = useForm();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

        const handleView =(id) =>{
        get(route("admin.user.detail", {id}));
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

      const handleChangeRowsPerPage = event => {
        setRowsPerPage(event.target.value,10);
        setPage(0);
      };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <div className="py-3">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-2 py-3">
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={2}>
                            <div><PeopleIcon/> Users</div>
                            {/* <Link href={route('admin.user.create')}>
                                <Button className="capitalize" variant="contained" color="primary" size={"small"} startIcon={<AddIcon/>}>
                                    Create
                                </Button>
                            </Link> */}
                            <div
                            style={{
                                margin: "10px",
                                display: "flex",
                                justifyContent: "end",
                            }}
                        >

                            <Create auth={auth}/>

                        </div>
                        </Box>
                        <TableContainer
                         sx={{ padding:"10px",border:"1px solid whitesmoke" }}>
                            <Table
                                aria-label="simple table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{fontWeight:"bold"}}>ID</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}>Name</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}>Email</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}>Role</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}>Action </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, j) => {
                                        return (
                                            <TableRow key={j + 1}>
                                                <TableCell>{item.id}</TableCell>
                                                <TableCell className="capitalize">
                                                    {item.name}
                                                </TableCell>
                                                <TableCell>
                                                    {item.email}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip label={item.user_role.replace('_'," ")}
                                                    sx={{ textTransform:"capitalize",backgroundColor:GlobalStyle.ChipColor[item.user_role].color,color:"white" }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                <IconButton aria-label="detail">
                                                   <VisibilityIcon sx={{color:"rgba(0, 0, 0, 0.54)"}} onClick={()=>handleView(item.id)}/>
                                                </IconButton>
                                                    &emsp;
                                                    {/* <Link
                                                        href={route('admin.user.edit',{id:item.id})}
                                                        method="get"
                                                    >
                                                    <IconButton aria-label="edit" color="primary">
                                                            <ModeEditIcon color="info"/>
                                                    </IconButton>
                                                    </Link> */}
                                                    <Edit auth={auth} user={item}/>
                                                    &emsp;
                                                   <Popover id={item.id}/>
                                                </TableCell>
                                            </TableRow>
                                        );
                                           })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 15, 20, 25, 50, 100]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
