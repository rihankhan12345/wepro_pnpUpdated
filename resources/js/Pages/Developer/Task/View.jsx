
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Alert,
     Chip,
    Collapse,
    IconButton,
    Paper,
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
// import Details from "./Details";
// import Edit from "./Edit";
import DateTimeFormat from "@/Util/DateTimeFormat";
import Create from "@/Components/Common/Project/Task/Create";
import List from "@/Components/Common/Project/Task/List";

export default function View({  auth,data, Id, developer}) {
    console.log(auth.user.id,data,'iddddd');

    const [page, setPage] = useState(0);
    const [expandedRows, setExpandedRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { item, setItem, get, post, processing, errors, reset } = useForm();

    const handleView = (id) => {
        get(route("admin.task-detail", { id }));
    };


    const toggleRow = (id) => {
        if (expandedRows.includes(id)) {
            setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
        } else {
            setExpandedRows([...expandedRows, id]);
        }
    };

    const handleCreate = () => {
        get(route("admin.task.create", { id: Id }));
    };

    const [isCreateModalOpen, setCreateModalOpen] = useState(false);

       const handleUpdate = (id) => {
        get(route("admin.edit-task", { id }));
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
                {data.length === 0 ? (
                    <>
                        <div className="py-1">
                            <div className="max-w-7xl mx-auto sm:px-2 lg:px-4">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <Alert
                                        severity="info"
                                        className="capitalize"
                                        style={{
                                            '& .severity': {
                                                MarginTop: '9px',
                                              },
                                         }}
                                    >
                                        No task found for this project ,You Don't have any Task !
                                    </Alert>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                  <List auth={auth} data={data} Id={Id} developer={developer}/>
                )}
                </>
    );
}
