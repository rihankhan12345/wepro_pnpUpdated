import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Alert,
    Box,
    Button,
    IconButton,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "@inertiajs/react";
import FormatDate from "@/Util/FormatDate";
import DateTimeFormat from "@/Util/DateTimeFormat";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Create from "./Create";
import List from "@/Components/Common/Project/List";

export default function View({ data, auth, developer, manager }) {

    console.log(manager,'managerrr');
    const { setData, get, processing, errors, setError } = useForm();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleView = (id) => {
        get(route("admin.project.detail", { id }));
    };

    const handleCreate = () => {
        get(route("admin.project.create"));
    };
    const handleUpdate = (id) => {
        get(route("admin.project.edit", { id }));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value, 10);
        setPage(0);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div  className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg px-2 py-3">
                        { data.length === 0 ? (
                            <>
                                <Alert
                                    severity="info"
                                    className="capitalize"
                                    style={{
                                        "& .severity": {
                                            MarginTop: "9px",
                                        },
                                    }}
                                    action={<Create
                                        developer={developer}
                                        manager={manager}
                                    />}
                                >
                                    Project Not Found ! Create A New Project
                                </Alert>
                            </>
                        ) : (
                            <>
                                <List  data={data} developer={developer} manager={manager} auth={auth}/>

                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
