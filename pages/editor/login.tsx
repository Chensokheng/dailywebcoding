import Loading from "@/components/Loading";
import EditorLayout, { useEditor } from "layout/EditorLayout";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import React, {
    FormEvent,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";

const Login = () => {
    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [error, setError] = useState("");
    const router = useRouter();
    const { login, user, loading } = useEditor();

    const inputs = [
        {
            placeholder: "example@gmail.com",
            type: "email",
            label: "Email",
            ref: emailRef,
        },
        {
            placeholder: "password",
            type: "password",
            label: "Password",
            ref: passwordRef,
        },
    ];
    const validateInput = () => {
        const password = passwordRef.current.value;
        if (password.trim().length < 6) {
            setError("Invalid password!");
            return false;
        } else {
            setError("");
            return true;
        }
    };
    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const isValid = validateInput();
        if (isValid) {
            login(emailRef.current.value, passwordRef.current.value);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (user) {
        router.push("/editor");
        return <Loading />;
    }

    return (
        <div className=" bg-primary h-99 w-full flex justify-center items-center p-5 sm:p-0">
            <div className="w-96">
                <h1 className="text-center text-4xl text-white font-bold">
                    Welcome back, author
                </h1>

                <div className="mt-10">
                    <p className="text-sm text-red-400 text-center mt-3">
                        {error}
                    </p>
                    <form onSubmit={onSubmit}>
                        {inputs.map(
                            ({ label, placeholder, type, ref }, index) => {
                                return (
                                    <div className="group mt-3" key={index}>
                                        <label className="text-sm text-gray-400">
                                            {label}
                                        </label>

                                        <input
                                            className="w-full border-gray-400 outline-none text-gray-300 mt-3 bg-secondary py-5 px-5 rounded-md text-xl hover:ring-2 focus:ring-2 ring-white placeholder:text-sm tracking-wide transition-all"
                                            type={type}
                                            placeholder={placeholder}
                                            ref={ref}
                                            required
                                        />
                                    </div>
                                );
                            }
                        )}

                        <button
                            className="mt-10 bg-white w-full py-5 rounded-md text-xl hover:ring-4 ring-blue-500 transition-all text-black"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

Login.getLayout = function getLayout(page: ReactElement) {
    return <EditorLayout>{page}</EditorLayout>;
};

export default Login;
