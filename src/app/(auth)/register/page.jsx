"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const router = useRouter()

    const [toggle, setToggle] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const handleLogin = async (data) => {
        const { name, email, password } = data

        const { data: res, error } = await authClient.signUp.email({
            name: name, // required
            email: email, // required
            password: password, // required
            callbackURL: "/",
        });

        if (error) {
            toast.error(error.message)
        }
        else if (password.lenght < 8) {
            toast.warning("Password must be 8 charachter long")
        }
        else {
            toast.success("Register Successful")
            router.push("/login")
        }

    }

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <form onSubmit={handleSubmit(handleLogin)}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 relative">
                    <div className='text-center mb-5 space-y-1'>
                        <h1 className='text-2xl font-medium'>Join <span className='text-[#7AA93C]'>MediQueue</span></h1>
                        <p>Create your account to start learning</p>
                    </div>
                    <label className="label">Name</label>
                    <input
                        type='text'
                        className="input"
                        placeholder="Enter your Name"
                        {...register("name", {
                            required: "Name field is required",
                        })}
                    />
                    {
                        errors.name && <p className='text-red-500'>{errors.name.message}</p>
                    }

                    <label className="label">Email</label>
                    <input
                        type='email'
                        className="input"
                        placeholder="Enter your Email"
                        {...register("email", {
                            required: "Email field is required",
                        })}
                    />
                    {
                        errors.email && <p className='text-red-500'>{errors.email.message}</p>
                    }

                    <label className="label">Picture</label>
                    <input
                        type='text'
                        className="input"
                        placeholder="Enter Image Url"
                        {...register("image", {
                            required: "Image field is required",
                        })}
                    />
                    {
                        errors.image && <p className='text-red-500'>{errors.image.message}</p>
                    }

                    <label className="label">Password</label>
                    <input
                        type={toggle ? "text" : "password"}
                        className="input"
                        placeholder="Enter your Password"
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

                    <button className="btn bg-[#7AA93C] text-white mt-4">Register</button>

                    <div className='mt-2'>
                        <p className='font-bold'>Already an acoount? <Link className='text-blue-500' href="/login">Login</Link></p>
                    </div>
                </fieldset>

            </form>
        </div>
    );
};

export default RegisterPage;


