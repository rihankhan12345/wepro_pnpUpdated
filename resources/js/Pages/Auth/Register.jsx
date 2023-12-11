import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        user_role: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };
    console.log(data,'vvvvvv')

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
 

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="user_role" value="Select User Role" />

                    <div>
                        <label className="text-sm text-gray-700 ml-1">
                            <input
                                id="admin"
                                type="radio"
                                name="user_role"
                                value="admin"
                                className="mr-2"
                                checked={data.user_role === "admin"}
                                onChange={(e) =>
                                    setData("user_role", e.target.value)
                                }
                                required
                            />
                            Admin
                        </label>

                        <label className="text-sm text-gray-700 mr-2" >
                            <input
                                id="hr_manager"
                                type="radio"
                                name="user_role"
                                value="hr_manager"
                                className="ml-8"
                                checked={data.user_role === "hr_manager"}
                                onChange={(e) =>
                                    setData("user_role", e.target.value)
                                }
                                required
                            />
                            HR Manager
                        </label>

                        <label className="text-sm text-gray-700 mr-2">
                            <input
                                id="project_manager"
                                type="radio"
                                name="user_role"
                                value="project_manager"
                                className="ml-8"
                                checked={data.user_role === "project_manager"}
                                onChange={(e) =>
                                    setData("user_role", e.target.value)
                                }
                                required
                            />
                            Project Manager
                        </label>

                        <label className="text-sm text-gray-700 mr-2">
                            <input
                                id="senior_developer"
                                type="radio"
                                name="user_role"
                                className="ml-8"
                                value="senior_developer"
                                checked={data.user_role === "senior_developer"}
                                onChange={(e) =>
                                    setData("user_role", e.target.value)
                                }
                                required
                            />
                            Senior Developer
                        </label>

                        <label className="text-sm text-gray-700 mr-2">
                            <input
                                id="junior_developer"
                                type="radio"
                                name="user_role"
                                value="junior_developer"
                                className="ml-8"
                                checked={data.user_role === "junior_developer"}
                                onChange={(e) =>
                                    setData("user_role", e.target.value)
                                }
                                required
                            />
                            Junior Developer
                        </label>
                    </div>

                    <InputError message={errors.user_role} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
