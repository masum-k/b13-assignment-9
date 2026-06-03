"use client"
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LoginPage = () => {

    const [toggle, setToggle] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const handleLogin = async (data) => {
        const { email, password } = data

        const { data: res, error } = await authClient.signIn.email({
            email: email, // required
            password: password, // required
            callbackURL: "/",
        });
        if (error) {
            toast.warning("Create an Account")
        } else {
            toast.success("Login Successful")
        }
    }

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-base-200'>
            <form onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset bg-white border-base-300 rounded-box w-xs border p-4 relative">
                    <div className='text-center mb-5 space-y-1'>
                        <h1 className='text-2xl font-medium'>Welcome <span className='text-[#7AA93C]'>Back</span></h1>
                        <p>Continue your learning journey today</p>
                    </div>
                    <div>
                        <button
                            className='btn w-full h-12 font-bold rounded-2x1 border-slate-200 hover:bg-slate-58 transition-colors gap-3'
                        >
                            <Image
                                width={20}
                                height={20}
                                src="https://www.google.com/favicon.ico"
                                className="w-5 h-5"
                                alt="Google"
                            />
                            Sign in with Google
                        </button>
                    </div>
                    <p className='text-center my-4 font-medium'>OR WITH EMAIL</p>
                    <label className="label">Email</label>
                    <input
                        type='email'
                        className="input"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email field is required",
                        })}
                    />
                    {
                        errors.email && <p className='text-red-500'>{errors.email.message}</p>
                    }

                    <label className="label">Password</label>
                    <input
                        type={toggle ? "text" : "password"}
                        className="input"
                        placeholder="Password"
                        {...register("password", {
                            required: "Password field is required",
                        })}
                    />
                    <span className='absolute bottom-32 left-72 cursor-pointer' onClick={() => setToggle(!toggle)}>
                        {toggle ? <FaEye /> : <FaEyeSlash />}
                    </span>
                    {
                        errors.password && <p className='text-red-500'>{errors.password.message}</p>
                    }
                    <button className="btn mt-4 bg-[#7AA93C] text-white">Login</button>
                    <div className='mt-2'>
                        <p className='font-bold'>Don&apos;t an acoount? <a className='text-blue-500' href="/register">Register</a></p>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default LoginPage;


