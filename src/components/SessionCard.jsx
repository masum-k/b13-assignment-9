import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const SessionCard = async () => {

    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booked-session`)

    return (
        <div className='bg-base-200 flex justify-between items-center border-2 border-amber-200 p-5'>
            <div>
                <Image
                    src="https://ui-avatars.com/api/?name=Test+Instructor&background=random"
                    alt='Session'
                    width={50}
                    height={50}
                />
            </div>
            <div>
                <h1>Hello</h1>
            </div>
        </div>
    );
};

export default SessionCard;