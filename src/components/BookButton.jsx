"use client"

import { authClient, useSession } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import React from 'react';
import { toast } from 'react-toastify';

const BookButton = ({ tutor }) => {

    const {data: session} = useSession ()

    const handleSession = async () => {
        const {data:jwtData} = await authClient.token()
        console.log(jwtData)
        if(!token){
            toast.error("Authentication failed, Session not Booked.")
            return;
        }
    }

    return (
        <Button 
        className="btn bg-[#7AA93C] text-white"
        onPress={handleSession}
        >
            Book Session
        </Button>
    );
};

export default BookButton;