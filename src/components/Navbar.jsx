"use client"

import { signOut, useSession } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const Navbar = () => {

    const router = useRouter()

    const { data: session, isPending } = useSession()

    const handleLogut = async () => {
        await signOut()
        router.push('/')
    }

    return (
        <>
            <div className="navbar bg-[#0D335B] shadow-sm md:px-6 z-10">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link href={'/'}>Home</Link>
                            </li>
                            <li>
                                <Link href={'/tutors'}>Tutors</Link>
                            </li>
                            <li>
                                <Link href={'/add-tutors'}>Add Tutors</Link>
                            </li>
                            <li>
                                <Link href={'/my-tutors'}>My Tutors</Link>
                            </li>
                            <li>
                                <Link href={'/my-booked-session'}>Booked Sessions</Link>
                            </li>
                        </ul>
                    </div>
                    <Link href={"/home"} className="text-3xl text-white font-medium">MediQueue</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal gap-4 px-1 text-white font-semibold">
                        <Link href={'/'}>Home</Link>
                        <Link href={'/tutors'}>Tutors</Link>
                        <Link href={'/add-tutors'}>Add Tutors</Link>
                        <Link href={'/my-tutors'}>My Tutors</Link>
                        <Link href={'/my-booked-session'}>Booked Sessions</Link>
                    </ul>
                </div>
                <div className="navbar-end">
                    {!isPending && !session
                        ? <Link href={"/login"} className="btn bg-[#7AA93C] border-none text-white">Login</Link>
                        : <div className="flex gap-2">
                            <div className="dropdown dropdown-end">
                                <div className="flex justify-center items-center gap-2">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <Image
                                                src={session?.user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                                                alt='profile picture'
                                                width={20}
                                                height={20}
                                            />
                                        </div>
                                    </div>
                                    <div className='text-white'>
                                        <h1>{session?.user?.name}</h1>
                                        <p>{session?.user?.email}</p>
                                    </div>
                                </div>
                                <ul
                                    tabIndex="-1"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li>
                                        <a className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </a>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li onClick={handleLogut}><a>Logout</a></li>
                                </ul>
                            </div>
                        </div>}
                </div>
            </div>
        </>


    );
};

export default Navbar;