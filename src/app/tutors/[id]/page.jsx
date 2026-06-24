import BookButton from '@/components/BookButton';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';


const fetchSingleTutor = async (id, token) => {
    const res = await fetch(`http://localhost:3001/tutors/${id}`, {
        headers: {
            authorization: `Bearer ${token}` || ""
        },
    });
    const data = await res.json()
    return data || {}
}

const DetailsPage = async ({ params }) => {

    const { id } = await params

    const { token } = await auth.api.getToken({
        headers: await headers(),
    });


    const tutors = await fetchSingleTutor(id, token)
    const { subject, country, hourlyRate, rating, experienceYears } = tutors



    return (
        <div className='md:w-7xl mx-auto mt-20 mb-20'>
            <div className="card bg-base-100 md:w-2xl mx-auto shadow-sm pt-10">
                <figure>
                    <Image
                        width={300}
                        height={300}
                        src={tutors.image || " "}
                        alt={tutors.name || "Name"}
                        className="rounded-xl h-72 "
                    />
                </figure>
                <div className="card-body items-center text-center">
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className="card-title">{tutors.name}</h2>
                        <p className='md:w-1/2'>{tutors.aboutMe}</p>
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
                            <p>{tutors.country}</p>
                            <p>{tutors.subject}</p>
                            <p>{tutors.experienceYears} Years</p>
                            <p>{tutors.rating}</p>
                            <p>${tutors.hourlyRate}</p>
                        </div>
                    </div>
                    <BookButton tutors={tutors} />
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;