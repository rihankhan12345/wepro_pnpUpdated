import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import View from "../Task/View";
import History from "../../../Components/Common/Project/History";
import Details from "@/Components/Common/Project/Details";

export default function Detail({ data, auth, user, task ,updated }) {
    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const url = window.location.pathname;
    const urlParts = url.split("/");
    const id = urlParts[urlParts.length - 1];

    return (
        <AuthenticatedLayout user={auth.user}>
         <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <Box
                                sx={{
                                    flexGrow: 10,
                                    margin: "3%",
                                    background: "white",
                                    boxShadow: "2px 2px 2px 2px #e3e1da",
                                }}
                            >
                                <TabContext value={value}>
                                    <TabList onChange={handleChange} className="px-3">
                                        <Tab label="Details" value="1" style={{ fontWeight:"bold"}}/>
                                        <Tab label="Task" value="2" style={{ fontWeight:"bold"}}/>
                                        <Tab label="History" value="3" style={{ fontWeight:"bold"}}/>
                                    </TabList>

                                    <TabPanel value="1">
                                        <Details data={data} user={user} auth={auth} updated={updated}/>
                                    </TabPanel>

                                    <TabPanel value="2">
                                        <View data={task} Id={id} developer={user} auth={auth} updated={updated}/>
                                    </TabPanel>

                                    <TabPanel value="3">
                                        <History data={data} auth={auth}/>
                                    </TabPanel>
                                </TabContext>
                            </Box>
                        </div>
            </div>
         </div>
        </AuthenticatedLayout>
    );
}
