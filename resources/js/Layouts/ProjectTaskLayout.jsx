import NavLink from "@/Components/NavLink";
import { Alert, Box, Button } from "@mui/material";
import { useState } from "react";

export default function ProjectTasks({ auth, children }) {
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const url = window.location.pathname;

    const urlParts = url.split("/");

    const id = urlParts[urlParts.length - 1];

    return (
        <Box
            sx={{
                flexGrow: 10,
                margin: "3%",
                background: "white",
                boxShadow: "2px 2px 2px 2px #e3e1da",
                padding: "20px",
            }}
        >
            <Box sx={{ width: "100%", typography: "body2" }}>
                <div className="flex" >
                    <div className="shrink-0 flex items-center">
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex" style={{ height:"50px" }}>
                            <NavLink
                                href={route("project.detail", id)}
                                active={route().current("project.detail", id)}
                                style={{ fontSize: "15px" }}
                            >
                                Project
                            </NavLink>
                        </div>
                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex" style={{ height:"50px" }}>
                            <NavLink
                                href={route("project.task.list", id)}
                                active={
                                    route().current("project.task.list", id) ||
                                    route().current("project.task.create", id) ||
                                    route().current("project.task.edit", id) ||
                                    route().current("project.task.detail", id)
                                }
                                style={{ fontSize: "15px" }}
                            >
                                Task
                            </NavLink>
                        </div>
                    </div>
                </div>
                <Box
                    sx={{
                        margin: "1%",
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
}
