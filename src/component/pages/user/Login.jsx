import React, { useState } from "react";
import Button from "../../common/Button";
import Input from "../../common/Input";
import handleFormChange from "../../../utility/utility";
import userApis from "../../../utility/user.api";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const onChange = (e) => {
        setFormData((prev) => handleFormChange(e, prev));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await userApis.login(formData)
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 font-['Inter',sans-serif]">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-[420px] rounded-2xl border border-black/10 bg-white p-8 shadow-sm"
            >
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-[-0.03em] text-[#0E0F0C]">
                        Login
                    </h1>
                    <p className="mt-2 text-sm text-[#454745]">
                        Enter your email and password to continue.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full"
                        value={formData.email}
                        onChange={onChange}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full"
                        value={formData.password}
                        onChange={onChange}
                    />

                    <Button type="submit" variant="primary" className="w-full">
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;