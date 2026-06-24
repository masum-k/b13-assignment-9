"use client"

import { authClient, useSession } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import React from 'react';
import { toast } from 'react-toastify';

export default function BookButton({ tutors }) {
    const { data: session } = useSession()

    const handleSession = async () => {

        const { data: jwtData } = await authClient.token()
        const token = jwtData?.token;

        if (!token) {
            toast.error("Authentication failed, Session not Booked.")
            return;
        }

        const updatedData = {
            userId: session?.user?.id,
            studentName: session?.user?.name,
            studentEmail: session?.user?.email,
            subject: tutors?.subject,
            image: tutors?.image,
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booked-session/${tutors?._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        })

        const data = await res.json()
        console.log(data)
    }

    return (
        <Button
            className="btn bg-[#7AA93C] text-white"
            onPress={handleSession}
        >
            Book Session
        </Button>
    );
}

