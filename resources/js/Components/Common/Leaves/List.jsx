import {
    Chip,
    Collapse,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useForm } from "@inertiajs/react";
import StatusStyle from "@/Constant/StatusStyle";
import DateTimeFormat from "@/Util/DateTimeFormat";
import Detail from "./Detail";
import Create from "./Create";
import Edit from "./Edit";
export default function List({ data, auth}) {

    const [page, setPage] = useState(0);
    const [expandedRows, setExpandedRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { item, setItem, get, post, processing, errors, reset } = useForm();

    const toggleRow = (id) => {
        if (expandedRows.includes(id)) {
            setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
        } else {
            setExpandedRows([...expandedRows, id]);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value, 10);
        setPage(0);
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "end",}} >
                {auth.user.user_role == "admin" && ( <Create Id={data[0].user_id} auth={auth} /> )}
            </div>

            <TableContainer sx={{ padding: "10px", border: "2px solid whitesmoke", background: "rgba(0,0,0,0.02)", }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>ID gjh</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}> Description </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Requested Date </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}> Status </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Action </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice( page * rowsPerPage,page * rowsPerPage + rowsPerPage)
                          .map((item, j) => {
                                return (
                                    <>
                                        <TableRow key={j + 1}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell className="capitalize">
                                                {item.description}
                                            </TableCell>
                                            <TableCell>
                                                <DateTimeFormat
                                                    date={item.requested_date}
                                                />
                                            </TableCell>

                                            <TableCell className="capitalize">
                                                <Chip
                                                    label={item.status}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton aria-label="detail">
                                                    <VisibilityIcon
                                                        onClick={() =>
                                                            toggleRow(item.id)
                                                        }
                                                        sx={{
                                                            color: "rgba(0, 0, 0, 0.54)",
                                                        }}
                                                    >
                                                        {expandedRows.includes(
                                                            item.id
                                                        ) ? (
                                                            <VisibilityIcon
                                                                sx={{
                                                                    color: "rgba(0, 0, 0, 0.54)",
                                                                }}
                                                            />
                                                        ) : (
                                                            <VisibilityIcon
                                                                sx={{
                                                                    color: "rgba(0, 0, 0, 0.54)",
                                                                }}
                                                            />
                                                        )}
                                                    </VisibilityIcon>
                                                </IconButton>
                                                &emsp;
                                                { auth.user.user_role == "admin" && (
                                                    <IconButton aria-label="edit">
                                                        <Edit
                                                            item={item}
                                                            auth={auth}
                                                        />
                                                    </IconButton>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                colSpan={6}
                                                sx={{
                                                    py: 0,
                                                    backgroundColor:
                                                        "#80808024",
                                                    px: {
                                                        xs: "5px",
                                                        md: "16px",
                                                    },
                                                }}
                                            >
                                                <Collapse
                                                    in={expandedRows.includes(
                                                        item.id
                                                    )}
                                                    unmountOnExit
                                                >
                                                    <Detail
                                                        data={item}
                                                        auth={auth}
                                                          />
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </>
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
        </>
    );
}
