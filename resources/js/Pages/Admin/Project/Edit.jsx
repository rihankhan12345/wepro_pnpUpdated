import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, router, useForm } from "@inertiajs/react";
import {
    Button,
    Grid,
    Typography,
} from "@mui/material";
import InputError from "@/Components/InputError";

export default function Edit({ data, auth, developer, manager, devId }) {

    console.log(devId,'devevloper');
    const [selectedDevelopers, setSelectedDevelopers] = useState([]);
    const { post, processing, errors, reset } = useForm();

    const [item, setItem] = useState({
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        project_manager: data.project_manager,
        developer: devId,
    });

    const handleChange = (e) => {
        setItem((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
    };

    const handleDeveloper = (id) => {
        setItem((prev) => ({
            ...prev,
            developer: prev.developer.includes(id)
                ? prev.developer.filter((value) => value !== id)
                : [...prev.developer, id],
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("admin.project.update", [data.id]), item);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="mt-5 flex flex-col sm:justify-center items-center sm:pt-0 bg-gray-100">
                <Head title="Create Project" />

                <div
                    className="w-full  mt-0 px-3 py-2 shadow-md bg-white overflow-hidden sm:rounded-lg"
                    style={{
                        width: "60%",
                        alignContent: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <form onSubmit={handleSubmit}>
                        <div
                            style={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center",
                                paddingBottom: "30px",
                            }}
                        >
                            <Typography
                                variant="h5"
                                style={{ fontWeight: "bold" }}
                            >
                                Edit Project
                            </Typography>
                        </div>
                        <div>
                            <InputLabel htmlFor="title" value="Title" />

                            <TextInput
                                id="title"
                                name="title"
                                value={item.title}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />

                            <textarea
                                id="description"
                                type="text"
                                name="description"
                                rows={3}
                                value={item.description}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                autoComplete="description"
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="Manager"
                                value="Select Manager"
                            />
                            <select
                                value={item.project_manager}
                                name="project_manager"
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                                onChange={(e) => handleChange(e)}
                                required
                            >
                                {manager.map((mngr, index) => {
                                    return (
                                        <option value={mngr} key={index}>
                                            {mngr}
                                        </option>
                                    );
                                })}
                            </select>
                            <InputError
                                message={errors.project_manager}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="start_date"
                                value="Start Date"
                            />

                            <TextInput
                                id="start_date"
                                type="date"
                                name="start_date"
                                value={item.start_date}
                                className="mt-1 block w-full"
                                autoComplete="start_date"
                                onChange={(e) => handleChange(e)}
                                required
                            />
                            <InputError
                                message={errors.start_date}
                                className="mt-2"
                            />
                        </div>


                        <div className="mt-4">
                            <InputLabel htmlFor="developer" value="Assign To" />

                            <Grid item xs={12}>
                                {developer.map((dev, index) => (
                                    <Button
                                        key={index}
                                        variant={
                                            item.developer.includes(dev.id)
                                                ? "contained"
                                                : "outlined"
                                        }
                                        size="small"
                                        onClick={() => handleDeveloper(dev?.id)}
                                        style={{ margin: "2px" }}
                                    >
                                        {dev.name} (
                                        {dev.user_role == "senior developer"
                                            ? "Senior"
                                            : "Junior"}
                                        )
                                    </Button>
                                ))}
                            </Grid>
                            <InputError
                                message={errors.developer}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex items-center justify-center m-8">
                            <PrimaryButton
                                className="ms-4"
                                variant="contained"
                                disabled={processing}
                                style={{
                                    height: "40px",
                                    backgroundColor: "#1976d2",
                                }}
                            >
                                Update Project
                            </PrimaryButton>

                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
