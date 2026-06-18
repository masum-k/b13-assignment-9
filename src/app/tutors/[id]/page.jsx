import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const fetchSingleTutor = async (id, token) => {
    const res = await fetch(`http://localhost:3001/tutors/${id}`, {
        headers: {
            authorization: `Bearer ${token}` || ""
        },
    });
    const data = res.json()
    return data || {}
}

const DetailsPage = async ({ params }) => {

    const { id } = await params

    const { token } = await auth.api.getToken({
        headers: await headers(),
    });


    const tutor = await fetchSingleTutor(id, token)
    const { subject, country, hourlyRate, rating, experienceYears } = tutor

    // const tutorsDetails = async (token) => {
    //     const res = await fetch(`http://localhost:3001/tutors/${id}`, {
    //         headers: {
    //             authorization: token || ""
    //         },
    //     });
    //     const data = res.json()
    //     return data || {}
    // }

    // const tutorsDetailsRes = await tutorsDetails(token)
    // const { subject, country, hourlyRate, rating, experienceYears } = tutorsDetailsRes

    return (
        <div className='md:w-7xl mx-auto mt-20 mb-20'>
            <div className="card bg-base-100 md:w-2xl mx-auto shadow-sm pt-10">
                <figure>
                    <Image
                        src={tutor.image}
                        alt={tutor.name}
                        width={300}
                        height={300}
                        className='rounded-xl'
                    />
                </figure>
                <div className="card-body items-center text-center">
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className="card-title">{tutor.name}</h2>
                        <p className='md:w-1/2'>{tutor.aboutMe}</p>
                    </div>
                    <div className='flex'>
                        <div>
                            <h1 className='font-medium'>Country : </h1>
                            <h1 className='font-medium'>Subject : </h1>
                            <h1 className='font-medium'>Experience : </h1>
                            <h1 className='font-medium'>Rating : </h1>
                            <h1 className='font-medium'>Hourly Rate : </h1>
                        </div>
                        <div>
                            <p>{tutor.country}</p>
                            <p>{tutor.subject}</p>
                            <p>{tutor.experienceYears} Years</p>
                            <p>{tutor.rating}</p>
                            <p>${tutor.hourlyRate}</p>
                        </div>
                    </div>
                    <div className="card-actions">
                        <Link href={"/book-session"} className="btn bg-[#7AA93C] text-white">Book Session</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;